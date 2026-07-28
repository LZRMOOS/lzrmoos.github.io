export default {
  "introducing-jimothy": {
    title: "Introducing Jimothy: A raccoon with a penchant for notes and a side of whimsy",
    date: "July 27, 2026",
    content: `
      <p class="post-intro">I've been building a notes and task-list app called Jimothy. It's a side project born out of a simple desire: I wanted something fast, keyboard-first, genuinely fun to open every day, and without AI.</p>

      <div class="screenshot-frame screenshot-frame--hero">
        <img src="/blog/jimothy/customization-pink-theme.png" alt="Jimothy running with a custom pink theme and codex icon sidebar" />
        <p class="screenshot-caption">Yes, it comes in pink</p>
      </div>

      <h2>Why Another Notes App</h2>

      <p>I wanted a notes app that felt like it was built for me specifically, and well, this one is. It's fast to open, easy to access, and endlessly tweakable. Most note apps ask you to choose between "simple and fast" or "powerful and configurable." Jimothy is my attempt at both, wrapped in a personality that doesn't take itself too seriously (hence Jimothy..).</p>

      <div class="callout callout-whimsy">
        <div class="callout-title">The Name</div>
        <p>Jimothy is a trash panda. He's on the app icon, and if you drop in your own emoji, he can be on your codex icons too. </p>
      </div>

      <h2>Local-First, Synced if and When You Want</h2>

      <p>Every note is just a Markdown file with a YAML frontmatter header. If you want your notes on your phone too, point Jimothy at a Dropbox folder and it syncs with conflict handling and all.</p>

      <div class="two-col">
        <div class="col-item">
          <div class="col-header">Today</div>
          <ul>
            <li>Fully local storage, plain Markdown + frontmatter</li>
            <li>Dropbox sync for desktop &lt;-&gt; mobile</li>
            <li>Byte-compatible note format between both apps</li>
          </ul>
        </div>
        <div class="col-item">
          <div class="col-header">On the Roadmap</div>
          <ul>
            <li>Google Drive</li>
            <li>Amazon (S3 / other storage)</li>
            <li>Microsoft (OneDrive)</li>
            <li>iCloud / WebDAV for mobile</li>
          </ul>
        </div>
      </div>

      <p>The storage layer is provider-agnostic by design, Dropbox was just the first implementation because it's what I use.</p>

      <h2>Notes That Get Out of Your Way</h2>

      <p>The editor is WYSIWYG Markdown: what you see is exactly what gets saved to disk. Bold, italics, strikethrough, inline code, blockquotes, syntax-highlighted code blocks, and GFM tables all just work.</p>

      <div class="screenshot-frame screenshot-frame--hero">
        <img src="/blog/jimothy/feature-tour-editor.png" alt="Jimothy note editor showing formatting, code blocks, and tags" />
        <p class="screenshot-caption">The built-in feature tour note, doubling as a live formatting demo</p>
      </div>

      <p>A few things that make notes feel connected:</p>

      <ul>
        <li><strong>Internal links</strong> — type <code>[[</code> to link to another note with autocomplete. Links are ID-based, so renaming a note never breaks a link.</li>
        <li><strong>Backlinks</strong> — every note shows an expandable list of what links back to it.</li>
        <li><strong>Mentions</strong> — type <code>@</code> to insert an entry from a personal dictionary of people, places, or anything else you reference often.</li>
        <li><strong>Tags</strong> — <code>#tag</code> syntax, extracted automatically, with custom per-tag colors and full searchability.</li>
        <li><strong>Custom emoji</strong> — drop in your own images, type <code>:name:</code> to insert them, and reuse them as codex icons.</li>
      </ul>

      <p>Right-click any note for quick actions, or split two notes side by side with <span class="kbd">Cmd</span><span class="kbd">\\</span> when you need to reference one while writing another.</p>

      <div class="two-col two-col--shots">
        <div class="col-item col-item--shot">
          <img src="/blog/jimothy/split-view.png" alt="Two Jimothy notes open side by side in split view, showing tasks and tags" />
          <p class="screenshot-caption">Split view — two notes at once</p>
        </div>
        <div class="col-item col-item--shot">
          <img src="/blog/jimothy/note-context-menu.png" alt="Right-click context menu on a note with pin, protect, freeze, duplicate, and delete options" />
          <p class="screenshot-caption">Pin, protect, freeze, duplicate, or archive — all from a right-click</p>
        </div>
      </div>

      <h2>Tasks That Live Next to Your Notes</h2>

      <p>Tasks aren't a separate app bolted on. They're checkboxes inside notes, with a dedicated "Today" view that pulls everything due across your entire vault into one place, grouped by day.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/tasks-today-view.png" alt="Jimothy Today task view showing tasks grouped by date with priority and recurrence pills" />
        <p class="screenshot-caption">The Today view, pulling tasks from every note into one timeline</p>
      </div>

      <p>Priority pills (<code>!high</code>, <code>!med</code>, <code>!low</code>) and due-date pills (<code>!YYYY-MM-DD</code>) turn a plain checkbox into something schedulable, right from the keyboard, without leaving the note it lives in.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/tasks-quick-add.png" alt="Quick-add task modal linking a task back to a source note" />
        <p class="screenshot-caption">Quick-adding a task, linked back to the note it came from</p>
      </div>

      <h2>Make It Yours</h2>

      <p>Almost everything about how it looks and behaves is configurable. Themes go beyond light and dark: every individual color, accent, background, text, hover state, can be tuned and saved as a named preset.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/customization-colors.png" alt="Jimothy customization settings showing individual color overrides for the light theme" />
        <p class="screenshot-caption">Every color, down to the selection highlight, is overridable — and savable as a named preset</p>
      </div>

      <p>Organization is just as flexible. Group notes into <strong>codexes</strong> (collections with their own icon and color), manage tags and their colors, and set a custom format for daily notes.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/organization-settings.png" alt="Organization settings showing codex, tag, and daily note configuration" />
        <p class="screenshot-caption">Codexes, tags, and daily note formatting, all in one settings pane</p>
      </div>

      <div class="two-col two-col--shots">
        <div class="col-item col-item--shot">
          <div class="col-header">Custom Emoji</div>
          <img src="/blog/jimothy/custom-emoji.png" alt="Custom emoji settings panel showing user-uploaded images including a raccoon and a frog" />
          <p class="screenshot-caption">Drop in your own images, type <code>:name:</code> to insert, or reuse them as codex icons</p>
        </div>
        <div class="col-item col-item--shot">
          <div class="col-header">Text Macros</div>
          <img src="/blog/jimothy/macros-settings.png" alt="Text macro settings showing built-in and custom expansion triggers" />
          <p class="screenshot-caption">Type a trigger like <code>/date</code>, get an expansion. Built-ins plus fully custom triggers.</p>
        </div>
      </div>

      <h2>Built for the Keyboard</h2>

      <p>A personal dictionary powers <code>@mentions</code> for the people and places you reference constantly, and the command palette (<span class="kbd">Cmd</span><span class="kbd">K</span>) reaches nearly every action and every note without touching the mouse.</p>

      <div class="two-col two-col--shots">
        <div class="col-item col-item--shot">
          <div class="col-header">Dictionary</div>
          <img src="/blog/jimothy/dictionary-settings.png" alt="Dictionary settings showing custom mention entries" />
          <p class="screenshot-caption">Add anyone or anything you mention often; type @ to pull them in</p>
        </div>
        <div class="col-item col-item--shot">
          <div class="col-header">Command Palette</div>
          <img src="/blog/jimothy/command-palette.png" alt="Jimothy command palette open with a list of note actions" />
          <p class="screenshot-caption">Search, jump to a note, or run any action</p>
        </div>
      </div>

      <p>Every shortcut, global or in-app, is click-to-rebind, so the keyboard works the way you already think.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/shortcuts-settings.png" alt="Keyboard shortcuts settings panel with rebindable global and search shortcuts" />
        <p class="screenshot-caption">Every shortcut, global or in-app, is click-to-rebind</p>
      </div>

      <h2>Security When You Actually Need It</h2>

      <p>Not every note needs a password, but some do. Jimothy has two independent layers: <strong>vault encryption</strong>, which locks every note on disk behind one password, and <strong>note protection</strong>, which encrypts individual notes while leaving the rest of your vault as plain Markdown.</p>

      <div class="screenshot-frame">
        <img src="/blog/jimothy/security-settings.png" alt="Security settings showing auto-lock, vault encryption, and note protection options" />
        <p class="screenshot-caption">Auto-lock on idle, sleep, or screen lock — encryption underneath either layer</p>
      </div>

      <p>The two layers can be used independently or together, and a PIN can wrap either (or both) for quick unlocking without typing a full password every time.</p>

      <div class="two-col two-col--shots">
        <div class="col-item col-item--shot">
          <div class="col-header">Set Up Note Protection</div>
          <img src="/blog/jimothy/note-protection-setup.png" alt="Setting up a note protection password" />
        </div>
        <div class="col-item col-item--shot">
          <div class="col-header">Vault Locked</div>
          <img src="/blog/jimothy/vault-locked.png" alt="Vault locked screen prompting for a password" />
        </div>
      </div>

      <div class="callout">
        <div class="callout-title">Nothing Stored</div>
        <p>Your password never touches disk, and neither does the encryption key it unlocks.</p>
      </div>

      <h2>On Your Phone Too</h2>

      <p>The mobile companion app is deliberately minimal. It's not a port of the desktop app, it's built for three things: using your todo-list, quick capture, and reading or lightly editing the notes your desktop app created. No encryption, no WYSIWYG editor, no codex management. Encrypted or protected notes just show up as locked "open on desktop" rows.</p>

      <div class="screenshot-frame screenshot-frame--mobile">
        <img src="/blog/jimothy/mobile-notes-list.png" alt="Jimothy mobile notes list showing synced notes" />
        <p class="screenshot-caption">Notes synced from desktop, ready to read or lightly edit on the go</p>
      </div>

      <div class="two-col two-col--shots two-col--mobile">
        <div class="col-item col-item--shot">
          <div class="col-header">Tasks, on the Go</div>
          <img src="/blog/jimothy/mobile-tasks-list.png" alt="Mobile tasks list grouped by day" />
        </div>
        <div class="col-item col-item--shot">
          <div class="col-header">Quick Capture</div>
          <img src="/blog/jimothy/mobile-quick-add.png" alt="Mobile quick-add task sheet" />
        </div>
      </div>

      <p>Themes even sync across devices, your desktop color preset shows up as an option on mobile automatically.</p>

      <div class="screenshot-frame screenshot-frame--mobile">
        <img src="/blog/jimothy/mobile-settings-sync.png" alt="Mobile settings screen showing desktop theme synced over and Dropbox as the notes folder provider" />
        <p class="screenshot-caption">The desktop theme, synced and selectable on mobile</p>
      </div>

      <h2>What's Next</h2>

      <div class="recommendations">
        <div class="rec-item">
          <div class="rec-number">1</div>
          <div class="rec-content">
            <h3>More Sync Providers</h3>
            <p>Dropbox works today. Google Drive, Amazon, and Microsoft are next, since the storage layer was built provider-agnostic from the start.</p>
          </div>
        </div>
        <div class="rec-item">
          <div class="rec-number">2</div>
          <div class="rec-content">
            <h3>Windows Support</h3>
            <p>Desktop already builds for macOS and Windows. Polishing that experience is ongoing.</p>
          </div>
        </div>
        <div class="rec-item">
          <div class="rec-number">3</div>
          <div class="rec-content">
            <h3>Keep It Weird</h3>
            <p>Every feature added has to survive one filter: does this make the app faster and more fun to use every day? If not, it doesn't ship.</p>
          </div>
        </div>
      </div>

      <hr class="section-divider" />

      <p>Jimothy is still evolving, and I'll post updates here as it grows. If fast, local-first, and slightly ridiculous is your kind of notes app, stay tuned.</p>
    `,
  },
  "building-a-security-aware-mindset": {
    title: "Building a Security Aware Mindset",
    date: "November 3, 2021",
    content: `
      <p class="post-intro">This post is adapted from a talk I gave on building a security-aware mindset for people across all roles, not just engineers. The goal is to help everyone think about risk, understand how adversaries approach problems, and start looking at the world through a security lens.</p>

      <h2>Why This Matters for Everyone</h2>

      <p>Security isn't just the security team's job. Every person in an organization makes decisions that affect security posture, from how they handle credentials to how they design a feature to how they respond to a suspicious email. The difference between an organization that gets breached and one that doesn't often comes down to whether people across the company have internalized a few key mental models.</p>

      <p>This isn't about memorizing a checklist. It's about developing intuition.</p>

      <h2>Thinking Like an Adversary</h2>

      <p>The core skill of security thinking is asking: <strong>"How could this go wrong?"</strong></p>

      <p>Adversaries don't play by the rules. They don't use your application the way you intended. They look for assumptions you've made and find ways to violate them. Building a security mindset means adopting this same perspective, not to attack, but to defend.</p>

      <div class="two-col">
        <div class="col-item">
          <div class="col-header">Normal Thinking</div>
          <ul>
            <li>"How do I make this work?"</li>
            <li>"What's the happy path?"</li>
            <li>"What does the user need?"</li>
            <li>"How do I ship this faster?"</li>
          </ul>
        </div>
        <div class="col-item">
          <div class="col-header">Security Thinking</div>
          <ul>
            <li>"How could someone make this fail?"</li>
            <li>"What happens when inputs are unexpected?"</li>
            <li>"What if the user is malicious?"</li>
            <li>"What am I assuming that might not be true?"</li>
          </ul>
        </div>
      </div>

      <p>Both perspectives are necessary. Great builders think about both simultaneously.</p>

      <h2>Core Principles</h2>

      <h3>1. Defense in Depth</h3>

      <p>Never rely on a single control. Layers of security mean that when (not if) one layer fails, others are there to catch the fall. This applies to everything from architecture to processes to access management.</p>

      <div class="callout">
        <div class="callout-title">Analogy</div>
        <p>A castle doesn't just have a front gate. It has a moat, outer walls, inner walls, locked chambers, and guards at every level. If the gate falls, the castle doesn't.</p>
      </div>

      <h3>2. Least Privilege</h3>

      <p>Every person, system, and process should have only the minimum access needed to do its job. Nothing more. This limits the blast radius when something goes wrong.</p>

      <p>Ask yourself:</p>
      <ul>
        <li>Does this service need write access, or just read?</li>
        <li>Does this role need admin, or just viewer?</li>
        <li>Does this API key need access to everything, or just one endpoint?</li>
        <li>Does this contractor need permanent access, or just temporary?</li>
      </ul>

      <h3>3. Trust, But Verify</h3>

      <p>Don't assume things are secure because they feel secure. Verify. This means validating inputs, checking configurations, reviewing access lists, and testing assumptions.</p>

      <table class="defense-table">
        <thead>
          <tr>
            <th>Assumption</th>
            <th>Reality Check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"Only our team uses this internal API"</td>
            <td>Is it actually authenticated? Could someone else discover it?</td>
          </tr>
          <tr>
            <td>"This data isn't sensitive"</td>
            <td>Could it be combined with other data to become sensitive?</td>
          </tr>
          <tr>
            <td>"Nobody would bother attacking us"</td>
            <td>Automated scanners don't discriminate by company size</td>
          </tr>
          <tr>
            <td>"The vendor handles security"</td>
            <td>Shared responsibility models mean you still own configuration</td>
          </tr>
          <tr>
            <td>"This is just a prototype"</td>
            <td>Prototypes have a habit of becoming production systems</td>
          </tr>
        </tbody>
      </table>

      <h2>Thinking About Risk</h2>

      <p>Security is fundamentally about managing risk. Not eliminating it (that's impossible) but understanding it, prioritizing it, and making informed tradeoffs.</p>

      <h3>The Risk Equation</h3>

      <div class="callout">
        <div class="callout-title">Risk Framework</div>
        <p><strong>Risk = Likelihood x Impact</strong></p>
        <p>A low-likelihood, high-impact event (like a full database breach) may warrant more investment than a high-likelihood, low-impact event (like a misconfigured header). But both deserve attention.</p>
      </div>

      <p>When evaluating a decision, ask:</p>

      <div class="recommendations">
        <div class="rec-item">
          <div class="rec-number">?</div>
          <div class="rec-content">
            <h3>What's the worst case?</h3>
            <p>If this goes wrong, how bad is it? Data loss? Financial loss? Reputational damage? A minor inconvenience?</p>
          </div>
        </div>
        <div class="rec-item">
          <div class="rec-number">?</div>
          <div class="rec-content">
            <h3>How likely is it?</h3>
            <p>Is this a common attack vector? Is the data valuable enough for someone to target? Is it internet-facing?</p>
          </div>
        </div>
        <div class="rec-item">
          <div class="rec-number">?</div>
          <div class="rec-content">
            <h3>What's the mitigation cost?</h3>
            <p>Is the fix trivial or expensive? Sometimes a 5-minute configuration change prevents a catastrophic outcome.</p>
          </div>
        </div>
      </div>

      <h2>Common Vulnerability Classes to Know</h2>

      <p>You don't need to be a security engineer to understand the major categories of vulnerabilities. Here are the ones that matter most:</p>

      <table class="defense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>What It Is</th>
            <th>How to Think About It</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Broken Access Controls</strong></td>
            <td>Users can access things they shouldn't</td>
            <td>Always ask: "What if someone who shouldn't be here... is?"</td>
          </tr>
          <tr>
            <td><strong>Injection</strong></td>
            <td>Untrusted input treated as code (SQL, commands, etc.)</td>
            <td>Never trust user input. Sanitize, parameterize, validate.</td>
          </tr>
          <tr>
            <td><strong>Exposed Secrets</strong></td>
            <td>API keys, passwords, tokens committed to code or logs</td>
            <td>If it's a secret, it belongs in a vault, not in source code.</td>
          </tr>
          <tr>
            <td><strong>Misconfiguration</strong></td>
            <td>Default settings, open ports, overly permissive policies</td>
            <td>Defaults are convenient, not secure. Review every default.</td>
          </tr>
          <tr>
            <td><strong>Social Engineering</strong></td>
            <td>Manipulating people into giving up access or information</td>
            <td>Verify identity through a second channel. Slow down.</td>
          </tr>
        </tbody>
      </table>

      <h2>Practical Habits for Everyone</h2>

      <p>Building a security mindset isn't about becoming a hacker. It's about developing small, consistent habits that compound over time.</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">Pause</div>
          <div class="stat-label">Before clicking links, granting access, or sharing data, take a beat. Ask yourself if something feels off.</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">Question</div>
          <div class="stat-label">Why does this need that permission? Why is this public? Why isn't this encrypted? Curiosity is a security tool.</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">Report</div>
          <div class="stat-label">See something weird? Say something. A false alarm costs minutes. A missed incident costs days, months, or worse.</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">Limit</div>
          <div class="stat-label">Share the minimum needed. Use the smallest permission set. Keep blast radius small by default.</div>
        </div>
      </div>

      <h2>For Engineers: Guardrails, Not Gatekeepers</h2>

      <p>If you're building software, here's the mindset shift that makes security scale: <strong>make the secure path the easy path.</strong></p>

      <p>This comes from Netflix's "Paved Road" philosophy. Instead of saying "no" and blocking teams, build secure defaults and golden paths that developers naturally follow because they're the fastest way to get things done.</p>

      <div class="callout">
        <div class="callout-title">Key Insight</div>
        <p>"Security engineering is the compound interest of security." Every secure default you ship today prevents vulnerabilities in every future feature that uses it. Find one good abstraction and you eliminate entire vulnerability classes. <em>- adapted from Clint Gibler</em></p>
      </div>

      <p>Concrete examples:</p>
      <ul>
        <li>Using a framework that escapes output by default eliminates XSS across your entire app</li>
        <li>A database library that only allows parameterized queries eliminates SQL injection</li>
        <li>A wrapper library for XML parsing that disables external entities eliminates XXE</li>
        <li>Secret management tooling that's easier than hardcoding means developers won't hardcode</li>
      </ul>

      <p>The pattern: identify a vulnerability class, build a secure-by-default library, make sure it's being used everywhere (via lightweight scanning), and move on to the next one.</p>

      <h2>The Bigger Picture</h2>

      <p>Security awareness isn't a one-time training module. It's a lens you develop over time. The more you practice asking "how could this go wrong?" the more natural it becomes.</p>

      <p>A few final thoughts:</p>

      <ul>
        <li><strong>Perfect security doesn't exist.</strong> The goal is raising the cost for an attacker high enough that they move on to an easier target.</li>
        <li><strong>Security is a team sport.</strong> One person can't secure everything. But if everyone is thinking about it a little bit, the overall posture improves dramatically.</li>
        <li><strong>Speed and security aren't enemies.</strong> The fastest way to ship is often the secure way, when you've invested in the right defaults and tooling upfront.</li>
      </ul>

      <hr class="section-divider" />

      <h2>Further Reading</h2>
      <ul>
        <li>Clint Gibler - <a href="https://tldrsec.com" target="_blank" rel="noopener">tl;dr sec newsletter</a></li>
        <li>OWASP Top 10 - The standard awareness document for web application security</li>
        <li>Netflix - "Paved Road" philosophy for developer security</li>
        <li>Google - "Building Secure and Reliable Systems" (O'Reilly)</li>
      </ul>
    `,
  },
  "sf-dbx-security-con-talk-2026": {
    title: "Securing AI Coding Platforms: Lessons from SF DBX Security Con",
    date: "April 6, 2026",
    content: `
      <p class="post-intro">I gave a 30-minute talk at the SF DBX Security Con on the challenges of shifting left in an era of AI coding companions and no-code deployment platforms. This post distills the key themes: why our existing SDLC controls aren't enough, what the "platform problem" actually is, and what we can do about it.</p>

      <h2>The State of AI-Generated Code</h2>

      <p>AI isn't just a coding assistant anymore. It's become a primary partner. According to recent surveys, the adoption is staggering:</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">72%</div>
          <div class="stat-label">of developers who've tried AI coding tools use them daily</div>
          <div class="stat-source">SonarSource Developer Survey</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">50-90%</div>
          <div class="stat-label">of new production code is at least AI-assisted</div>
          <div class="stat-source">Gemini Overview</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">40-62%</div>
          <div class="stat-label">of AI-generated code contains security vulnerabilities or design flaws</div>
          <div class="stat-source">Multiple sources</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">1.7x</div>
          <div class="stat-label">more bugs introduced by AI than human-written code</div>
          <div class="stat-source">CodeRabbit Study, 470 PRs</div>
        </div>
      </div>

      <p>This creates a paradox: code velocity is way up, but so is review and debugging time. We're generating more code faster, but we can't guarantee any of it is secure.</p>

      <h2>The Scale Problem</h2>

      <p>Our development pipelines were built for humans. We've embedded ourselves so deeply in code review, threat modeling, and design reviews that we've become the bottleneck. AI can generate a full feature in seconds while a human code review might take hours or days, especially when PRs are getting larger and more complex due to AI generation.</p>

      <div class="callout">
        <div class="callout-title">The Core Tension</div>
        <p>We can't continue reviewing code the same way because we can't scale. But we also can't let AI operate unchecked since even the latest models produce insecure code at alarming rates. The answer is using AI to help secure AI.</p>
      </div>

      <h2>Defense Layers for the AI SDLC</h2>

      <p>To address this, security teams have been layering AI-specific controls into their pipelines. Here's a primer on what that looks like:</p>

      <table class="defense-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>What It Looks Like</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>System Prompt Guardrails</strong></td>
            <td>Configuring coding agents to avoid anti-patterns</td>
            <td>An <code>AGENTS.md</code> referencing internal secrets management docs</td>
          </tr>
          <tr>
            <td><strong>Model Governance</strong></td>
            <td>Evaluating models for safety, maintaining allow/deny lists</td>
            <td>No Deepseek; prompt injection mitigation layers</td>
          </tr>
          <tr>
            <td><strong>Sandboxing</strong></td>
            <td>Isolating execution environments, limiting tool access</td>
            <td>Restricting what agents can call in YOLO mode</td>
          </tr>
          <tr>
            <td><strong>AI-Enhanced Security Tooling</strong></td>
            <td>Leveraging AI in existing pipeline tools</td>
            <td>AI-powered secrets detection, Semgrep rule generation, AWS SCPs</td>
          </tr>
          <tr>
            <td><strong>Pre-Commit Security Agents</strong></td>
            <td>Agents reviewing code before it ships</td>
            <td>Pre-commit hooks with AI-powered linting</td>
          </tr>
          <tr>
            <td><strong>Adversarial Agents</strong></td>
            <td>Agents actively looking for vulnerabilities</td>
            <td>Local or CI-based agents performing DAST-like testing</td>
          </tr>
        </tbody>
      </table>

      <h2>Industry Backing</h2>

      <p>This multi-layered approach isn't just something security teams are figuring out on their own. Both Anthropic's 2026 Agentic Coding Trends Report and the Cloud Security Alliance's recent Mythos guidance reinforce the same themes:</p>

      <div class="two-col">
        <div class="col-item">
          <div class="col-header">Anthropic (2026 Trends)</div>
          <ul>
            <li><strong>"Human oversight scales through intelligent collaboration"</strong> - Use AI to review AI, but reserve complex decisions for humans augmented by AI context.</li>
            <li><strong>"Agentic coding improves security defenses, but also offensive uses"</strong> - Adversarial agents should pressure-test code, because threat actors will.</li>
          </ul>
        </div>
        <div class="col-item">
          <div class="col-header">CSA Mythos Guidance</div>
          <ul>
            <li>Use LLM-based vulnerability discovery and remediation</li>
            <li>Accelerate teams with coding agents</li>
            <li>Focus on defense-in-depth/breadth: segmentation, egress filtering, MFA</li>
          </ul>
        </div>
      </div>

      <div class="callout callout-warn">
        <div class="callout-title">The Catch</div>
        <p>We're relying on AI to secure AI, and these agents are non-deterministic. All of this is best effort. That doesn't make it useless. It's still defense in depth. The more layers, the more chances to catch issues. But it's not a guarantee.</p>
      </div>

      <h2>The Platform Problem</h2>

      <p>Even if you've implemented every defense layer above with 100% efficacy (you haven't), there's still something I call the <strong>platform problem</strong>.</p>

      <p>The AI coding landscape is fragmented. Each platform has its own configuration model, its own deployment strategy, and its own security posture:</p>

      <table class="platform-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Configuration Model</th>
            <th>Enterprise Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Claude Code</strong></td>
            <td>Local config files, MDM-deployed policies</td>
            <td>Maturing, decentralized, harder to enforce</td>
          </tr>
          <tr>
            <td><strong>Cursor</strong></td>
            <td>Local config + centralized admin console</td>
            <td>More mature, organization-level settings</td>
          </tr>
          <tr>
            <td><strong>Copilot</strong></td>
            <td>GitHub-integrated, org-level policies</td>
            <td>Tied to GitHub enterprise ecosystem</td>
          </tr>
        </tbody>
      </table>

      <p>The takeaway: you're going to make your life difficult if you try to support them all. <strong>Pick one or two and commit.</strong></p>

      <h2>Shadow IT: No-Code AI Platforms</h2>

      <p>Beyond coding agents, there's a category that's potentially even more dangerous: <strong>AI coding platforms</strong> that don't just write code but deploy and host it too.</p>

      <p>Vendors like Lovable, Vercel's v0, and Replit are essentially no-code solutions marketed towards non-technical users. They handle frontend, backend, database, lambdas, WAF rules, all configured by AI agents on their infrastructure.</p>

      <p>Anthropic's 2026 trends report predicted this: <em>"Non-technical teams across sales, marketing, legal, and operations gain the ability to automate workflows and build tools with little or no engineering intervention."</em></p>

      <h3>Why This Is Dangerous</h3>

      <p>These platforms will pass your vendor assessment. They'll have SOC 2, ISO 27001, pen test reports, encrypted data. But that's just the foundation. Think of it like AWS: the platform provides tools to succeed, but it's not AWS's fault if you misconfigure IAM or leave an S3 bucket public.</p>

      <p>When you put these tools in the hands of people with no coding or DevOps experience, things get spicy.</p>

      <h2>Case Study: Lovable</h2>

      <p>In early 2026, someone posted on r/cybersecurity about "vibe-hacking" a Lovable-hosted app. In a few hours they obtained:</p>

      <div class="breach-list">
        <div class="breach-item">18,697 user records (names, emails, roles) <span class="breach-tag">no auth</span></div>
        <div class="breach-item">Account deletion via single API call <span class="breach-tag">no auth</span></div>
        <div class="breach-item">Student grades modifiable <span class="breach-tag">no auth</span></div>
        <div class="breach-item">Bulk email sending <span class="breach-tag">no auth</span></div>
        <div class="breach-item">Enterprise org data from 14 institutions <span class="breach-tag">no auth</span></div>
      </div>

      <h3>Testing It Ourselves</h3>

      <p>About a month later, we tested Lovable with a simple prompt:</p>

      <div class="prompt-box">
        <div class="prompt-label">Prompt</div>
        <p>"Create an app that allows people to sign up, read comments, and post replies."</p>
      </div>

      <p>The result? A functional app, but with a <strong>hardcoded database key in the source code</strong> granting anyone direct read/write access to the database. The platform's AI support bot explained this was "by design" and that the user needed to configure Row Level Security policies.</p>

      <p>Fair? Maybe. But when the platform is marketed towards non-technical users, expecting them to know what RLS is, let alone configure it, defeats the purpose.</p>

      <h3>The Core Issue</h3>

      <p>These platforms exist entirely outside your security perimeter:</p>

      <div class="perimeter-grid">
        <div class="perimeter-item missing">SIEM visibility</div>
        <div class="perimeter-item missing">D&R log access</div>
        <div class="perimeter-item missing">IDS monitoring</div>
        <div class="perimeter-item missing">Secrets scanning</div>
        <div class="perimeter-item missing">Branch protection</div>
        <div class="perimeter-item missing">Code review processes</div>
        <div class="perimeter-item missing">CI/CD tests</div>
        <div class="perimeter-item missing">Dependency scanning</div>
      </div>

      <h2>What Should We Do?</h2>

      <div class="recommendations">
        <div class="rec-item">
          <div class="rec-number">1</div>
          <div class="rec-content">
            <h3>Be Opinionated About Platforms</h3>
            <p>Evaluate options, but commit to one or two from the top down. Supporting every AI coding agent is untenable since each needs bespoke hardening for compliance, privacy, legal, security, and engineering requirements.</p>
          </div>
        </div>

        <div class="rec-item">
          <div class="rec-number">2</div>
          <div class="rec-content">
            <h3>Invest in Internal Developer Experience</h3>
            <p>People use external platforms because they're easy, fast, and frictionless. The best defense is making your own infrastructure just as easy to deploy to. If it's as simple to ship apps internally, nobody has a reason to look elsewhere. Use the existence of these platforms as a mirror: they expose exactly how much friction exists in your own pipelines.</p>
          </div>
        </div>

        <div class="rec-item">
          <div class="rec-number">3</div>
          <div class="rec-content">
            <h3>Create Safe Guardrails, Not Roadblocks</h3>
            <p>These tools enable real innovation from non-engineering teams. Don't kill that energy. Shepherd it. Build golden paths with proper guardrails so people can experiment with AI safely within your ecosystem.</p>
          </div>
        </div>
      </div>

      <h2>Closing Thoughts</h2>

      <p>AI is here. Adoption is only ramping up. It's not just software engineers anymore, it's everyone. That's exactly why defense-in-depth controls alongside AI coding pipelines are more critical than ever. They're our training wheels, and we need them.</p>

      <p>The next thing you know, your parents won't be calling you about the printer anymore. They're gonna be vibe coding a startup and asking you what a 500 is.</p>

      <hr class="section-divider" />

      <h2>Acknowledgments</h2>

      <ul>
        <li>Brooks McMillin - slide layout</li>
        <li>Adrian Wood &amp; Jonathan Hawes - Lovable vulnerability research</li>
      </ul>

      <h2>References</h2>

      <ul>
        <li><a href="https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf" target="_blank" rel="noopener">Anthropic - 2026 Agentic Coding Trends Report</a></li>
        <li><a href="https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/04/mythosready-20260413.pdf" target="_blank" rel="noopener">Cloud Security Alliance - Mythos Vulnerability Storm Guidance</a></li>
        <li><a href="https://www.reddit.com/r/cybersecurity/comments/1rffin3/i_vibe_hacked_a_lovableshowcased_app_16/" target="_blank" rel="noopener">r/cybersecurity - Vibe-hacking a Lovable app</a></li>
        <li>CodeRabbit - "The State of AI vs Human Code Generation"</li>
        <li>SonarSource - Developer Survey 2025</li>
      </ul>
    `,
  },
};
