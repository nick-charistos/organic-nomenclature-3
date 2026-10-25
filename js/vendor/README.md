# Vendored small libraries

Committed so the app works without third-party CDNs for security- and
compatibility-critical dependencies. Large, actively updated libraries (JSmol,
`j2s/`) stay outside Git; see the project README for the local/CDN policy.

## Contents

| Path | Version | License |
|---|---|---|
| `jquery/jquery-4.0.0.min.js` | 4.0.0 | MIT (`jquery/LICENSE.txt`) |
| `dompurify/dompurify-3.4.17.min.js` | 3.4.17 | MPL-2.0 OR Apache-2.0 (`dompurify/LICENSE.txt`) |

## Update procedure

1. Download the minified build from the official source.
2. Update the versioned filename and license file.
3. Compute SHA-512 (base64) and record it below.
4. Update the `<script>` tag in the current `mulermoc-nom-*.html`.
5. Run `node --check` on app JS and smoke-test the app.

```sh
openssl dgst -sha512 -binary FILE | openssl base64 -A
```

## SHA-512 (base64) of committed files

- `jquery/jquery-4.0.0.min.js`:
  `8LENNbXmzI/Gbj+OwXmqR6V4QaUAw0/porPzy1+dQoJqC0JPHedWoe0DDOTL2uHA5XXJyIsPtiMHH86pVlay6A==`
- `dompurify/dompurify-3.4.17.min.js`:
  `2wT0W6vojz3cJuLoa/DxrPVQRinkfRjFWMWIDK4NghTqObEhpem1nEkeK0d9ZE+/hyvfMNuJZlfxM4LsRgeoSA==`

These are the hashes of the local files. CDN SRI values can differ if the CDN
re-encodes the response; verify the exact artifact before using SRI.

## jQuery 4 note

jQuery 4.0.0 is the current major. If a regression appears, vendor 3.7.1 as a
temporary fallback and keep the same path/update procedure.
