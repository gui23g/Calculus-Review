# Calculus Review

A responsive, English-language Calculus I study companion for Myongji University. It runs entirely in the browser and can be hosted on GitHub Pages without a build step, backend, account, or API key.

Made by: Guilherme "Boler" Lopes de Carvalho.

## Study experience

- **Homepage:** eleven topic cards, chapter filters, a filter for the 2025 midterm’s focus areas, and locally saved exercise progress.
- **Guided reviews:** explanations, core formulas, practical applications, common mistakes, and 54 embedded exercises with worked solutions.
- **Math input:** type normally or use each exercise’s calculator-style keypad. It inserts at the cursor, supports selections and backspace, and includes powers, fractions, roots, absolute value, trigonometric functions, variables, π, infinity, and interval union. Press Enter to check an answer. The input uses plain text, with a live typeset preview below it so you can check exactly how the expression is interpreted. Placeholders are neutral and never show a question’s answer.
- **Mathematical display:** all 179 question statements (54 lesson exercises and 125 exam fields), the 45 lesson paragraphs, all worked solutions, and mathematical passages in application notes and warnings use explicit mathematical presentation. Fractions, radicals, powers, limits, definite/indefinite integrals, indexed sums, subscripts, evaluation brackets, lesson formula panels and expected answers render synchronously using native [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML/Reference/Element/math), with no external scripts or CDN. Use a current Chrome, Edge, Firefox or Safari browser.
- **Feedback:** Correct, Almost, or Incorrect, followed by the expected answer and a step-by-step solution. Invalid or empty input gets a notation message without being treated as a mathematical mistake. You can edit and retry.
- **Practice exams:** five original papers based on the six-question structure of the supplied 2025 midterm. Each has 25 answer fields: the original 22 fields covering the six-question structure, plus a three-field graph-reading extension. The absolute-value question also displays its own graph. Starting a new attempt randomly selects a different version from the previous one and always opens empty answer fields. An inline confirmation protects an open attempt when replacing it; it does not use a browser modal.
- **Exam review:** check individual answers or submit the entire paper. The summary gives a practice score and links to the topics to revisit. Every graded exam exercise also links directly to its review lesson. Blank fields count as unanswered and zero points; filling them later updates the review.
- **Persistence:** mastery progress, current exam answers, feedback, and the last selected paper use localStorage on the current browser/device. The exam landing page offers **Continue saved paper** explicitly; saved responses never appear in a new attempt. Reloading or visiting a review topic preserves the saved exam, which can then be resumed. Lesson exercises reopen with empty inputs while mastery progress remains on the homepage. Private browsing or blocked storage may prevent saving, but practice still works. Clear this site’s browser storage to reset everything.

The revised interface uses versioned `calculus-*-v2` storage keys. It deliberately does not import the first prototype’s saved answers or development-test progress; existing old keys are left untouched.

## Course material and coverage

The source PDFs are in `.context/`. Reviews are original explanations informed by these materials; the practice papers are new variants rather than copies or official exams.

| Topic | Course connection | 2025 midterm focus |
| --- | --- | --- |
| Functions, domains, symmetry, composition, graph transformations | Ch1 §1.1; HW1 Q6–9 | Q1, Q4 |
| Limits, continuity, IVT, infinity | Ch1 §§1.3–1.6; HW1 Q1–4 | Q3 |
| Graph values, one-sided limits, holes/jumps, tangent slopes, derivative graphs, transformations and signed area | HW1 Q1–2; HW2 Q2; Ch1 §1.1; Ch3 §§3.3–3.4; Ch4 §§4.2–4.3 | Q4–5, plus additional worksheet/lecture practice |
| Derivative definition and tangent lines | Ch2 §§2.1–2.2; HW1 Q5 | Q2 |
| Power, product, quotient, chain and higher derivatives | Ch2 §§2.3–2.5; HW2 Q3–11 | Q5 |
| Implicit differentiation and related rates | Ch2 §§2.6–2.7; HW2 Q12–15 | Additional lecture coverage |
| Extrema, Rolle’s theorem, MVT | Ch3 §§3.1–3.2 | Supporting knowledge |
| Monotonicity, asymptotes, concavity, inflection points | Ch3 §§3.3–3.4 | Q5 |
| Optimization | Ch3 §3.5 | Additional lecture coverage |
| Antiderivatives and initial conditions | Ch3 §3.7; Ch4 §4.3 | Q6 |
| Riemann sums, definite integrals, signed area, distance | Ch4 §§4.1–4.3 | Additional lecture coverage |

The homepage labels last year’s focus; the supplied material does not establish the exact scope of this year’s exam. Chapter 4 is included because it was provided. The six core exam questions follow last year’s structure. The new seventh question is an additional graph-reading extension covering the worksheet skills; depending on the version, it can also include signed-area practice from Chapter 4. The original exam’s square-root endpoint limit can depend on the domain-relative convention; practice variants explicitly request a right-hand limit to avoid that ambiguity.

## Run locally

Open `index.html` directly for a quick look, or serve the repository for consistent browser storage behavior:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. No installation or build is needed. Optional Google Fonts improve the typography; system fallbacks work offline. All application logic and questions are local.

## Publish with GitHub Pages

1. Commit and push `index.html`, `styles.css`, `math.js`, `math-view.js`, `content.js`, `content-view.js`, `graph-content.js`, `graphs.js`, `app.js`, `.nojekyll`, and optionally the source PDFs to your GitHub repository.
2. Open the repository’s **Settings → Pages**.
3. Choose **Deploy from a branch**, select the branch containing the files (usually `main`), and select **/(root)**. Save.
4. After deployment completes, open `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

All assets use relative paths. Routes use URL hashes (`#/topic/limits`, `#/exam`), so topic links and refreshes work under a project repository path without server rewrite rules. The link to the original exam expects its existing file in `.context/`; GitHub Pages publishes files in this directory with `.nojekyll` present. If you omit the PDFs, remove that link in `app.js`.

The site is ready for Pages; this project does not itself enable Pages or push/publish changes to your GitHub account.

## Supported answer notation

| Input | Example |
| --- | --- |
| Fractions and grouping | `(1-x^2)/(x^2+1)^2` |
| Powers and implicit multiplication | `2x^3`, `2(x+1)`, `x^(5/2)` |
| Functions (parentheses required) | `sqrt(3)`, `abs(x-2)`, `sin(x)`, `cos(x)`, `tan(x)`, `sec(x)`, `ln(x)`, `exp(x)` |
| Constants | `pi`, `π`, `e`; `C` for a general antiderivative |
| Interval unions | `(-3,1] U (2,inf)` or `(-3,1] ∪ (2,∞)` |
| Isolated domain points | `[1,1]` |
| No limit / short interpretation | `DNE`, `odd`, or the word requested by the prompt |

Enter only the requested expression, not `y=`, `f(x)=`, units, or a full derivation. All trigonometry uses radians. Infinity is supported as an interval endpoint, not as a regular arithmetic operand. Intervals may be entered in any order; overlapping connected pieces are merged. Short text questions list the expected response in the prompt.

### How grading works

`math.js` uses a recursive-descent parser for a restricted expression language. It does not use `eval` or `Function`. Arithmetic precedence handles unary minus and right-associative exponentiation. Variables not requested by the question are rejected.

- Expressions are compared at 24 deterministic sample assignments, with a relative tolerance of `1e-8` and at least eight finite comparisons. Equivalent expanded, factored, or unsimplified forms earn **Correct**.
- **Almost** means correct interval boundary values with incorrect endpoint inclusion, a correct antiderivative missing `+ C`, or a constant answer close within `5e-4` relative tolerance but not exact within the strict tolerance.
- General-antiderivative questions check the supplied expression with several values of x and C, including that C contributes as an additive constant.
- Intervals are parsed and compared with their endpoint inclusion; text answers use a small list of accepted forms.
- Practice scoring assigns 1 point to Correct and ½ to Almost per answer field. It does not reproduce official exam weights or partial credit for written reasoning.

This is a numerical equivalence checker, not a complete symbolic algebra system or proof checker. Finite sampling can miss differences in contrived expressions and does not prove that two expressions have identical domains. The worked solution remains the reference. Simplification alone is not grounds to penalize a mathematically equivalent answer.

## Files and maintenance

| File | Purpose |
| --- | --- |
| `index.html` | Static page shell and script loading |
| `styles.css` | Responsive layout, typography, keypad and feedback styles |
| `content.js` | Lessons, exercise answers/solutions and five parameterized exam variants |
| `math.js` | Expression/interval parsing and grading |
| `math-view.js` | Safe, synchronous MathML rendering of expressions and `$...$` spans |
| `content-view.js` | Explicit typeset question statements and lesson formula panels |
| `graph-content.js` | Original SVG graph datasets, graph-reading lesson and three-field exam extensions |
| `graphs.js` | Responsive SVG figures, labeled axes, open/closed points, shading and text descriptions |
| `tests/graphs.test.cjs` | Independent geometric checks of graphs, answer keys and accessibility IDs |
| `app.js` | Hash routing, rendering, input, local progress and exam flow |
| `tests/math.test.cjs` | Automated grading, parser and independent derivative checks |
| `tests/front-end.test.cjs` | All question/formula render checks and HTML escaping |
| `.context/` | Supplied course source PDFs |

To add a topic, extend `Course.topics` in `content.js` with a unique ID, source mapping, explanatory sections and exercises. Each exercise needs a unique ID, topic ID, prompt, answer and solution steps. Set `type: 'interval'` or `type: 'text'` where needed, and `constant: true` for general antiderivatives. Set `displayAnswer` to show `+ C` while keeping the base expression in `answer`. Add the typeset statement, section paragraphs and solution steps in `content-view.js`; surround complete mathematical expressions with `$...$` instead of marking just their roots or function names. Display syntax also accepts `lim[x,4](expression)`, `lim[x,4+](expression)`, `integral[x,0,2](expression)`, `int[x](expression)`, `sum[i,1,n](expression)`, `eval[x,0,2](expression)` and subscripts such as `C_1` or `x_i`. These are local display conventions, not a general LaTeX interpreter; unsupported user input is safely shown as plain text until corrected. Grading still uses the restricted answer language described above.

## Verification

Run the meaningful math checks with Node.js:

```sh
node tests/math.test.cjs
node tests/front-end.test.cjs
node tests/graphs.test.cjs
```

They validate every reference answer across all topics and papers, equivalent expressions, invalid notation, interval endpoint handling, missing constants, rounding, operator precedence, and independent finite-difference checks of all exam curve derivatives and initial-value functions. Display tests verify every question, expected answer, complete solution step, lesson paragraph and formula, including safe escaping of HTML-like input. A regression check explicitly detects mathematical notation left outside `$...$` delimiters in paragraphs, solutions, application notes and warnings; checking only rendering failures would miss untouched plain-text formulas. The integral-evaluation example, Riemann summation, integration constants and velocity function notation have dedicated checks.

Browser verification covered the original ten lesson pages and the new graph-reading lesson. The graph-reading page has five figures and 23 empty exercise fields, no math-display fallbacks, working section jumps, and correct feedback on a graphical-limit answer. The homepage Graph reading filter opens the new lesson. Both desktop and 390px mobile layouts were inspected without horizontal overflow.

The revised practice exam opened with 25 empty answer fields and four figures (the absolute-value graph plus three extension figures), with unique figure/ARIA IDs. Submission included the new graph fields in the score and linked their feedback to the graph-reading lesson. Starting another paper cleared answers and feedback. Exam browser tests ran on a separate localhost origin to avoid changing the user’s saved study attempt.

## Reading and interpreting graphs

Open **Reading & interpreting graphs** in the study roadmap, or use the **Graph reading** homepage filter. The new lesson includes five original figures and 23 graded exercises:

1. A piecewise function with open/closed points: function values, one-sided and two-sided limits, removable/jump discontinuities, domain, range and worksheet-style true/false statements.
2. A curve and a dashed tangent: distinguish height, tangent slope and average rate of change.
3. A graph of the derivative: infer increasing/decreasing intervals, local extrema, concavity and an inflection location, and recognize what cannot be determined about the original function.
4. A downward absolute-value graph: reconstruct its translation, reflection and scale.
5. A shaded velocity graph: distinguish signed integral, displacement and total distance.

The figures are local SVGs with labeled scales, distinct open/closed markers and expandable text descriptions. Links at the top jump between the five lesson sections. Related existing lessons link to this visual practice. All exercises use the existing mathematical keypad, feedback and worked-solution flow. New lesson fields start empty. Existing saved exam answers are retained; newly added graph extension fields are blank in older saved attempts.

Each of the five practice papers now includes three extra graph-reading questions, with a diagram immediately beside the question, worked feedback and a direct link back to the graph-reading lesson. The exact combination varies by paper. The core absolute-value transformation question also now has a plotted V.

The graph tests read the plotted coordinates to independently verify holes/limits, tangent slopes, domain/range, derivative sign changes and signed triangular areas. They also check that repeated figures in a paper receive unique SVG/ARIA IDs. These tests run alongside the expression-grading and mathematical-display checks.
