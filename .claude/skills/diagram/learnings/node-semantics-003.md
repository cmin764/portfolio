---
topic: node-semantics
source: VONQ Knowledge Base session (2026-04-27)
---

Managed hosting of commodity tech and proprietary SaaS data products are both "external" in the infrastructure sense, but map to different C4 primitives.

- **Commodity tech on managed hosting** (Supabase Postgres, Upstash Redis, RDS, Heroku Postgres, ElastiCache): use `ContainerDb` or `Container`. We own the schema, run migrations, and control the data lifecycle. The hosting provider is an implementation detail -- conceptually it is our container, just not self-hosted.
- **Proprietary SaaS data product** (Pinecone, Algolia, Elastic Cloud, Typesense Cloud): use `System_Ext`. We subscribe to an index or service with a proprietary API. We do not deploy or migrate it -- we consume it.

Both roles hold data we own. The distinction is whether the underlying technology is commodity (Postgres, Redis) or proprietary/specialized.

**Color rule (orthogonal to primitive):** both types are passive data stores, so both get the orange data-store palette (`#ffd8a8` / `#e8590c`), regardless of primitive. C4 primitive encodes deployment ownership; color encodes runtime role. These are independent axes.

**Why:** using `ContainerDb` for a proprietary SaaS overstates our control over the infrastructure. Using `System_Ext` for a self-hosted-equivalent managed DB understates our ownership of the data layer. The primitive should reflect what we deploy and control, not just whether we pay a third party.

**Anti-pattern:** treating all managed/cloud-hosted data services the same way -- either all `System_Ext` or all `ContainerDb`.

**Fix:** ask "is the underlying technology commodity (Postgres, Redis) or proprietary to a vendor?" If commodity on managed infra: `ContainerDb`. If a vendor-specific product with its own API: `System_Ext` with orange override.
