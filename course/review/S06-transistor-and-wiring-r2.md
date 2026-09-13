# Survey traceability and reader check: S06

Reviewed 2026-09-13. This new survey was drafted and reread for a programming-literate reader with school physics. It is a conceptual overview, not a new source of proprietary measurements. Word count: 2646 (whitespace-separated source words); one interactive widget; six main explanatory sections.

| Survey quantity | Deep-module source | Boundary / check |
|---|---|---|
| Ideal conventional subthreshold swing at 300 K | [11](../modules/11-transistor-architectures.md) | Independent ln(10)kT/q arithmetic; conventional switching at 300 K. |
| Representative nanosheet thickness | [11](../modules/11-transistor-architectures.md) | Representative geometry; vendor recipes unresolved. |
| Example gate stack | [11](../modules/11-transistor-architectures.md) | EOT = 0.6 + 1.8×3.9/20 = 0.951 nm for assumed k=20. |
| Copper bulk resistivity | [12](../modules/12-interconnect-beol.md) | Bulk reference; not a fabricated line specification. |
| Leading logic metal stack | [12](../modules/12-interconnect-beol.md) | Product-dependent stack; experimental Intel PowerVia counts are separate. |
| Intel PowerVia test-chip result | [11](../modules/11-transistor-architectures.md), [12](../modules/12-interconnect-beol.md) | Intel test vehicle; not every production design. |

The related body examples reuse these module mechanisms and model inputs. Definitions precede the mechanism they support; the main narrative connects cause, manufacturing action and downstream consequence. The number table preserves approximation and product/date boundaries. The widget is a teaching model; vendor recipes and commercial estimates retain the evidence limits in the linked deep-module r2 reports. Browser rendering and widget behavior are checked separately by the site reviewer.
