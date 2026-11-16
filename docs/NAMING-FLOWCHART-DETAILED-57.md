# Detailed naming algorithm flowcharts (v57)

These diagrams follow the 2D Greek naming path in
[mulermoc-nom-core-57.js](../js/mulermoc-nom-core-57.js). They describe what
the code does, not a complete implementation of IUPAC rules. The
[overview](NAMING-FLOWCHART-57.md) shows how the stages fit together. English
naming and the separate 3D analysis path are outside this document.

## 1. Analyse the structure

`fAnalyseStructure` reads the JSME molecule. Connectivity and valence below
exclude bonds to explicit hydrogen; `bondList` still records every bond.

```mermaid
flowchart TD
    A["Read atom and bond counts from JSME"] --> B["Record atom labels, distinct types and type counts"]
    B --> C["For each bond not involving H: add neighbors in both directions"]
    C --> D["Add bond order to each heavy atom's valence"]
    D --> E["For each C: estimate H count as 4 minus heavy-atom valence"]
    E --> F["Record all bonds and their orders"]
    F --> G["Collect C-C multiple bonds"]
    G --> H["Classify C=C, C≡C, C=O and C≡N bond indices"]
    H --> I["Pass atom and bond data to functional-group detection"]
```

## 2. Detect functional groups

`fDetectMolType` uses heavy-atom connectivity, valence and bond order. It
first classifies atoms individually, then combines related oxygen
classifications. Detection does not imply that naming supports the result.
Explicit H has no dedicated detection case.

```mermaid
flowchart TD
    A["Reset molecule type and functionalGroupObj"] --> B{"Exactly one atom type?"}
    B -- "Only C" --> C["Register hydrocarbon"]
    B -- "Another type" --> D["Mark not organic"]
    B -- "Multiple types" --> E["Iterate atom types other than C"]
    E --> F{"Atom type"}
    F -- "F, Cl, Br, I" --> G["Register each atom as halogen"]
    F -- "N" --> H["Classify each nitrogen: diagram 2a"]
    F -- "O" --> I["Classify each oxygen: diagram 2b"]
    F -- "Other" --> J["No classification case"]
    I --> K["Merge acid and ester oxygen pairs: diagram 2c"]
    G --> L["Record group and atom indices"]
    H --> L
    K --> L
    J --> L
    L --> M{"More atom types?"}
    M -- Yes --> E
    M -- No --> N["Return detected groups"]
    C --> N
    D --> N
```

### 2a. Nitrogen

For terminal N, the valence is the sum of bond orders to heavy atoms. For
non-terminal N, bond counts are taken from the full bond list.

```mermaid
flowchart TD
    A["Examine N atom"] --> B{"One heavy-atom neighbor?"}
    B -- Yes --> C{"Heavy-atom valence"}
    C -- 1 --> D["amine"]
    C -- 2 --> E["imine"]
    C -- 3 --> F["cyanide / nitrile"]
    C -- Other --> D
    B -- No --> G["Count single, double and triple bonds and C/O neighbors"]
    G --> H{"Two O, one C, at least one single bond and one O double bond?"}
    H -- Yes --> I["nitro"]
    H -- No --> J{"Any triple bond?"}
    J -- Yes --> F
    J -- No --> K{"Any double bond to C?"}
    K -- Yes --> L["CCimine"]
    K -- No --> M["CCamine"]
    D --> N["Register classification and N index"]
    E --> N
    F --> N
    I --> N
    L --> N
    M --> N
```

### 2b. Oxygen

The aldehyde/ketone decision uses the neighboring atom's heavy-atom valence
and connectivity. For ordinary carbonyls that neighbor is carbon.

```mermaid
flowchart TD
    A["Examine O atom"] --> B{"One heavy-atom neighbor?"}
    B -- No --> C["Register ether"]
    B -- Yes --> D{"Neighbor is N?"}
    D -- Yes --> E{"N has exactly one C and two O neighbors?"}
    E -- Yes --> F["Nitro O: do not register separately"]
    E -- No --> G["Register unsupported O-on-N group"]
    D -- No --> H{"O heavy-atom valence"}
    H -- 1 --> I["Register alcohol"]
    H -- 2 --> J{"Neighbor valence is 3, or 2 with one heavy neighbor?"}
    J -- Yes --> K["Register aldehyde"]
    J -- No --> L["Register ketone"]
    C --> M["Continue to oxygen-pair checks"]
    F --> M
    G --> M
    I --> M
    K --> M
    L --> M
```

### 2c. Reclassify oxygen pairs

The pairs are stored as O indices in `functionalGroupObj`. Matched preliminary
groups are removed; empty buckets are deleted.

```mermaid
flowchart TD
    A["After individual O classifications"] --> B{"Alcohol O and ketone O share a C?"}
    B -- Yes --> C["Replace pair with carboxylicAcid"]
    B -- No --> D{"Alcohol O and aldehyde O share a C?"}
    C --> D
    D -- Yes --> E["Replace pair with carboxylicAcid"]
    D -- No --> F{"Ether O and ketone O share a carbonyl C?"}
    E --> F
    F -- Yes --> G["Replace pair with ester"]
    F -- No --> H{"Ether O and aldehyde O share a carbonyl C?"}
    G --> H
    H -- Yes --> I["Replace pair with ester"]
    H -- No --> J["Keep remaining individual groups"]
    I --> J
```

The second acid and ester checks also catch methanoic acid and formate esters,
whose carbonyl can initially be classified as aldehyde.

## 3. Check naming scope

`fGuessName` initializes the naming tables if needed. If no group was
detected, it inserts a hydrocarbon entry before these checks.

```mermaid
flowchart TD
    A["Collect detected group keys"] --> B{"Any groups?"}
    B -- No --> C["Insert hydrocarbon fallback"]
    B -- Yes --> D["Check element allowlist"]
    C --> D
    D --> E{"Only C, H, N, O, F, Cl, Br and I?"}
    E -- No --> X["Throw NOM-DECLINE"]
    E -- Yes --> F{"One group type?"}
    F -- Yes --> G{"Group in single-group allowlist?"}
    G -- No --> X
    G -- Yes --> Y["Proceed to parent-chain selection"]
    F -- No --> H["Rank groups by seniority"]
    H --> I{"Principal and remaining prefixes in their allowlists?"}
    I -- No --> X
    I -- Yes --> Y
```

Single-group naming allows hydrocarbon, halogen, nitro, alcohol, ketone,
ether, aldehyde, cyanide, carboxylic acid and ester. For multiple groups, the
principal must be carboxylic acid, cyanide, aldehyde, ketone or alcohol.
Amine may be a prefix, but an amine alone is not in the single-group
allowlist. Other guards may still decline a structure later.

## 4. Select the parent chain

`fCalcMainChain` normally runs inside `fGuessName`; the chain stepper can ask
`fGuessName(true)` to retain its already-selected chain instead.

```mermaid
flowchart TD
    A["Build carbon-only adjacency graph"] --> B{"Exactly one carbon?"}
    B -- Yes --> C["Use that carbon; validate and return"]
    B -- No --> D["Find carbon terminals with degree at most one"]
    D --> E{"Any terminals?"}
    E -- No --> F["Fallback to carbon list; validate and return"]
    E -- Yes --> G["DFS from terminals; collect and deduplicate terminal-to-terminal paths"]
    G --> H["Find functional-group anchor carbons and forced-C1 candidates"]
    H --> I["Build C=C and C≡C lookup sets"]
    I --> J{"Acyclic monoether graph?"}
    J -- Yes --> K["Keep paths on largest carbon fragment that include an O attachment"]
    J -- No --> L["Score candidate paths"]
    K --> L
    L --> M{"Any path found?"}
    M -- No --> F
    M -- Yes --> N["Choose preliminary best: most multiple bonds, then double bonds, length and anchors"]
    N --> O["Orient preliminary path; prepare ether or ester fragment information"]
    O --> P["Build authoritative ranked chain pool: diagram 4a"]
    P --> Q["Orient pool paths: diagram 4b"]
    Q --> R["Select pool entry at current stepper index"]
    R --> S["Store 1-based JSME atom numbers and compare with stored chain when available"]
```

The no-terminal and no-path cases are fallbacks, not support for cyclic
nomenclature. The preliminary path also supplies ether/ester fragment
information; the ranked pool determines the displayed chain when nonempty.

### 4a. Rank the chain pool

```mermaid
flowchart TD
    A["Find anchors of highest-priority ranked functional group"] --> B{"Any paths cover all required anchors?"}
    B -- Yes --> C["Keep covering paths"]
    B -- No --> D["Keep all paths"]
    C --> E["Keep most C-C multiple bonds"]
    D --> E
    E --> F["Keep most C=C bonds"]
    F --> G["Keep longest paths"]
    G --> H{"Supported alcohol or ketone graph?"}
    H -- Yes --> I["Prefer lower O locants, then multiple-bond and double-bond locants"]
    H -- No --> J{"Applicable supported graph for branch ranking?"}
    I --> J
    J -- Yes --> K["Prefer most carbon branches, then lowest branch locants and alphabetical key"]
    J -- No --> L["Sort remaining paths by anchor count and original order"]
    K --> L
    L --> M["Retain tied paths in stepper pool"]
```

### 4b. Orient a path

Each locant comparison considers the path in both directions. Equal-priority
terminal groups at both ends suppress the forced-C1 choice.

```mermaid
flowchart TD
    A["Find highest-priority terminal-group carbon on path"] --> B{"One eligible forced-C1 carbon?"}
    B -- Yes --> C["If it is at the tail, reverse the path"]
    B -- No --> D["Compare principal-group locants"]
    D --> E{"Tied?"}
    E -- No --> Z["Use lower-locant direction"]
    E -- Yes --> F["Compare all multiple-bond locants"]
    F --> G{"Tied?"}
    G -- No --> Z
    G -- Yes --> H["Compare double-bond locants"]
    H --> I{"Tied?"}
    I -- No --> Z
    I -- Yes --> J["Compare substituent locants, including supported carbon branches"]
    J --> K{"Tied?"}
    K -- No --> Z
    K -- Yes --> L["Apply applicable carbon-branch and halogen/nitro alphabetical tie-breaks"]
    L --> M["Use preferred direction; keep forward on a complete tie"]
    C --> N["Return oriented path"]
    Z --> N
    M --> N
```

Forced-C1 priority is carboxylic acid, ester, cyanide, then aldehyde.

## 5. Choose the active chain and build name components

After chain calculation, stored-chain mode can replace the selected 2D chain
when matching data exists. The function also attempts to match the numbered
2D chain to the 3D chain.

```mermaid
flowchart TD
    A["Use selected or stepped algorithmic chain"] --> B{"Stored-chain mode and matching data?"}
    B -- Yes --> C["Use equivalent pool chain or stored chain"]
    B -- No --> D["Keep selected chain"]
    C --> E["Attempt numbered 2D-to-3D chain match"]
    D --> E
    E --> F["Choose Greek stem from parent-chain length"]
    F --> G{"C-C multiple bonds?"}
    G -- No --> H["Use saturated stem component"]
    G -- Yes --> I["Calculate and sort double and triple bond locants"]
    I --> J{"Every multiple bond lies on parent chain?"}
    J -- No --> X["Throw NOM-DECLINE"]
    J -- Yes --> K["Build ene/yne components and multiplicity prefixes"]
    H --> L["Find supported carbon branches and group by name and locants"]
    K --> L
    L --> M{"One group type or multiple?"}
    M -- One --> N["Apply group-specific rules: diagram 5a"]
    M -- Multiple --> O["Choose senior suffix and build other group prefixes"]
    O --> P{"C-C multiple bond or unplaceable substituent?"}
    P -- Yes --> X
    P -- No --> Q["Apply principal locants and sorted prefix slots"]
    N --> R["Finalize components: diagram 6"]
    Q --> R
```

### 5a. Single functional-group naming

```mermaid
flowchart TD
    A{"Group type"} -->|Hydrocarbon| B["Use hydrocarbon suffix"]
    A -->|Halogen or nitro| C["Build prefix groups and locants; handle supported decorated branches"]
    A -->|Alcohol or ketone| D["Build O locants, multiplicity and suffix"]
    A -->|Aldehyde, cyanide or acid| E["Build suffix and multiplicity"]
    A -->|Ether| F["Build alkoxy prefix and parent; also prepare common ether name"]
    A -->|Ester| G["Build acid part and alcohol-derived alkyl ester tail"]
    C --> H{"Required locants available and case supported?"}
    D --> H
    H -- No --> X["Throw NOM-DECLINE"]
    H -- Yes --> Y["Arrange component slots"]
    B --> Y
    E --> Y
    F --> Y
    G --> Y
```

Some locants are omitted for short chains under the code's school-naming
conventions. Branch and decorated-branch support is restricted to the graph
shapes checked by the corresponding helpers.

## 6. Assemble the output

```mermaid
flowchart TD
    A["Place prefixes, stem, bond components, locants and suffix into twelve slots"] --> B["Store nameComponentsList"]
    B --> C{"Single ester?"}
    C -- Yes --> D["Join acid slots and ester tail separately, with a space between"]
    C -- No --> E["Join all nonempty slots"]
    D --> F["Apply Greek consonant-joining vowel rules within each part"]
    E --> F
    F --> G["Store currentMolName"]
    G --> H["For ethers, currentMolCommonName may also be available"]
```

The core throws `NOM-DECLINE` for several unsupported elements, groups and
locant situations. Callers decide how to handle that error. Detection and
fallback paths should therefore not be interpreted as a guarantee that every
structure is named correctly.
