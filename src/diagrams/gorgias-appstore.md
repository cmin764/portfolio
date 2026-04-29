# Gorgias: App Store (2021) — Container Diagram

Gorgias runs its own OAuth2 Authorization Code Grant server (Flask + authlib), enabling third-party developers to build integrations that connect external services with the Gorgias helpdesk platform. Developers register via the Developer Portal to obtain a `client_id` and `client_secret`, then submit their app through a review gate before it appears in the App Store for merchants to install. The Developer Portal is a Web UI — all writes go through the App Store Flask backend. Auth0 sits alongside as the merchant SSO identity layer, not part of the third-party OAuth issuance. PostgreSQL stores helpdesk data plus app and OAuth state (app configs, tokens with revocation, OAuth clients, authorization codes).

The install flow splits into two labeled steps: a) App Store redirects the merchant's browser to the third-party install URL; b) the third-party app drives a front-channel browser redirect to `/oauth/authorize` and receives an authorization code; c) back-channel server-to-server POST to `/oauth/token` exchanges the code for `access_token` + `refresh_token`. Once a token is issued, the third-party app calls the Gorgias API directly.

```mermaid
C4Container
  title Gorgias: App Store (2021)

  Person(developer, "External Developer", "Registers app; drives install + token exchange")
  Person(merchant, "Merchant", "Browses App Store; authorizes third-party access")

  System_Ext(auth0, "Auth0", "Merchant SSO identity provider (Gorgias login only)")
  System_Ext(thirdParty, "Third-party App", "OAuth client; stores client_id, client_secret, access + refresh tokens")

  Boundary(gorgiasPlatform, "Gorgias Platform", "system") {
    Container(developerPortal, "Developer Portal", "Web UI", "App registration, OAuth2 config, sandbox access, app submission + review gate")
    Container(appStore, "App Store + OAuth Server", "Flask + authlib + Auth0 SDK", "App marketplace for merchants + OAuth2 server (/oauth/authorize, /oauth/token, consent UI)")
    Container(gorgiasApi, "Gorgias API", "Flask + REST", "Helpdesk REST API at /api/*; validates bearer tokens via shared DB")
    ContainerDb(db, "Gorgias DB", "PostgreSQL", "Helpdesk data + App & OAuth state: configs, tokens, clients, codes")
  }

  Rel(developer, developerPortal, "registers + configures app")
  Rel(developerPortal, appStore, "publishes approved app listing")
  Rel(merchant, appStore, "browses + clicks Install + authorizes consent")
  Rel(merchant, auth0, "SSO login")
  Rel(appStore, thirdParty, "a) redirects to install URL")
  %% Parallel edges collapse to last one (mermaid-syntax-002); Excalidraw is authoritative.
  Rel(thirdParty, appStore, "b) auth request / auth code")
  Rel(thirdParty, appStore, "c) code-for-token / access + refresh tokens")
  Rel(appStore, db, "persists app registrations + review state")
  Rel(appStore, db, "persists OAuth state")
  Rel(thirdParty, gorgiasApi, "REST: bearer token")
  Rel(gorgiasApi, db, "validates token + queries helpdesk data")

  UpdateElementStyle(developer, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(merchant, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(auth0, $fontColor="#868e96", $bgColor="#e9ecef", $borderColor="#868e96")
  UpdateElementStyle(thirdParty, $fontColor="#868e96", $bgColor="#e9ecef", $borderColor="#868e96")
  UpdateElementStyle(developerPortal, $fontColor="#1971c2", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(appStore, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(gorgiasApi, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(db, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```
