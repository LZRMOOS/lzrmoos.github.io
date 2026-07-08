export default {
  "sf-dbx-security-con-talk-2026": {
    title: "Securing AI Coding Platforms: Lessons from SF DBX Security Con",
    date: "April 6, 2026",
    content: `
      <p><em>These are my speaker notes and slides from my 30-minute talk at the SF DBX Security Con on April 6, 2026. The talk focused on the challenges of shifting left and securing AI coding companions in an era of democratized software development.</em></p>

      <h2>Introduction</h2>

      <p>Hi all, my name is Wei and I work in security at Dropbox with a focus on application security—which these days is also AI, I guess. So that's what I'm here to talk about. For the next 30 minutes we'll dive into what it means to shift left these days, along with raising awareness about some skeletons in your closet you might not know about.</p>

      <h2>The AI Coding Revolution</h2>

      <p>We're seeing AI everywhere. The adoption is basically across every sector, and the democratization of coding is happening in real time.</p>

      <p>Because of that, anyone can have an app now. I don't know if you all remember or used MySpace, but it's kind of like back then when people were copying random HTML and CSS layouts from all over the web to bedazzle their MySpaces.</p>

      <p>You have to give AI credit—the end result looks a little better—but at the end of the day we have non-technical people building these slick interfaces without knowing how they got there. It's very easy to miss and gloss over what's actually happening under the hood and all the components it takes to not only build, but also deploy and maintain a web application. AI is like the cable management behind my desk—it looks clean… as long as you don't look behind it.</p>

      <h2>The Numbers Don't Lie</h2>

      <p>And the numbers back this up. AI-generated code is becoming a significant portion of what's being written today. According to a developer survey by SonarSource, 72% of developers who have tried AI use it every day.</p>

      <p>A Gemini Overview backs that up with a claim that 50-90% of new production code is at the very least AI-assisted, calling out a trend that AI has transitioned from being just a coding assistant to being in the driver's seat as a primary partner.</p>

      <p>What's the result? It's been reported that while code velocity is high, there's increased review and debugging time, and roughly 40-62% of AI-generated code contains security vulnerabilities or design flaws, needing <strong>INTENSE</strong> human verification—not just human verification, but INTENSE human verification.</p>

      <p>These trends show us that while AI is enabling teams to do more, it's also introducing new challenges around code quality and, most pertinent to us, security. It's not surprising that when more powerful models are released, adoption ramps up, more code gets generated, and we see a corresponding surge in security issues being detected.</p>

      <h2>The Scale Problem</h2>

      <p>And in a lot of ways, it's a problem of scale. Humans can't consume or create content at the speed at which AI can, and our development pipelines are largely built for humans.</p>

      <p>We've embedded ourselves so deeply in these processes that now we've become the bottleneck. It's not just the increased volume of code that is problematic—I mean that is an issue—but there's also the fact that a typical code review takes a lot longer than the generation of code. That in turn is also exacerbated by the increased size and complexity of pull requests we're seeing due to AI.</p>

      <p>So now we're experiencing this paradigm shift, where it's like, okay, we've hit this hard capacity limit in terms of headcount—we can't just keep growing the team. So how do we remove ourselves, and this friction, from the process?</p>

      <h2>Securing the SDLC</h2>

      <p>And that leads us to our software development life cycle we've spent so much time and effort integrating security into. This pipeline has so many touch points with things like design reviews and threat modeling, as well as linters and static code analysis, dependency scanning, etc. I could go on. This stuff is our bread and butter.</p>

      <p>But with the advent of AI, of course we've had to "AI" all the things also. We're not just working with developers anymore—we've had to figure out how to support AI.</p>

      <h3>The State of AI vs Human Code Generation</h3>

      <p>To that point, CodeRabbit recently published a study called "The state of AI vs human code generation" and the results are fairly telling. They studied about 470 open source GitHub pull requests and what they found was basically that "AI created 1.7 times more bugs than humans."</p>

      <p>Some of which were critical security issues related to things like authentication logic, which at a surface level, when it comes to code review, can look plausible unless the reviewer really dives into the code flow and understands what's going on.</p>

      <p>So, we've established that we can't continue to have humans review code the same way as we have been because we can't scale, but we also can't just let AI do as it pleases because, as we've seen, even with the latest models, we can generate a lot of code, but we certainly can't guarantee that it's necessarily good code or much less assume that it's secure code.</p>

      <h2>Defense Layers</h2>

      <p>So now that we're aligned on our problem space, what can we do then? In terms of our SDLC, we've had to think about ways to augment our existing security layers and add more on top for AI. Here's a quick primer:</p>

      <ul>
        <li><strong>System Prompts as Guardrails:</strong> We've looked at beefing up our system prompts to help our coding agents avoid common anti-patterns. This could look like an <code>AGENTS.md</code> file somewhere where you reference internal docs on specifically how to do secrets management within your environment.</li>

        <li><strong>Model Evaluation &amp; Frameworks:</strong> We've evaluated models for not just performance but also safety, and established frameworks and guidance around the use of LLMs. This could look like making sure there's an allowlist of models, or at the very least a denylist. You might also have a framework that inserts a prompt injection mitigation layer.</li>

        <li><strong>Sandboxing:</strong> With things like YOLO mode with Claude, we need ways to isolate execution environments of agents and limit to what extent which tools can be called and what they can access.</li>

        <li><strong>AI-Enhanced Security Tools:</strong> We've also looked at the security tools we use that are embedded into our development pipeline and looked at to what degree these tools can leverage AI. Things like improved pattern matching on secrets detection scanning, using AI to help write detections and Semgrep rules, or even create AWS SCPs.</li>

        <li><strong>Pre-commit Security Agents:</strong> You might have also created agents to look for security issues and help review code on developer workstations. This might look like a pre-commit hook or linter that runs prior to code being committed or pushed.</li>

        <li><strong>Adversarial Agents:</strong> You might even have considered building or buying an adversarial agent that actively looks for vulnerabilities in your code and systems. This could be an agent that runs locally or is in CI somewhere, fulfilling a role similar to that of DAST.</li>
      </ul>

      <p>You might be thinking this is a lot of layers—do we actually need all these things? But all this was just a quick primer and we can actually dig in a little more.</p>

      <h2>Industry Trends: Agentic Coding</h2>

      <p>We're not going to go too deep in the weeds here, but I do think it's worth some time to take a look at Anthropic's 2026 Agentic Coding Trends Report.</p>

      <p>A couple of the trends that stood out to me most are:</p>

      <ul>
        <li><strong>"Human oversight scales through intelligent collaboration":</strong> It's imperative that we use AI to help review AI-generated output as it's the only way to scale. But also, it speaks to the need to review AI outputs and, in particular, look out for security issues. We also have to do it in a smart way because we can't just hand off everything to AI—as we've seen, AI is even more prone to mistakes in coding than humans. So most of our productivity gains will be found in automating trivial, straightforward functions, whereas the more complex design decisions should still be ultimately handled by a human review, augmented by AI context.</li>

        <li><strong>"Agentic coding improves security defenses—but also offensive uses":</strong> This is pretty straightforward in calling out the need to augment our coding agents with more focused adversarial agents whose specific role is to question and pressure-test the code being generated by their coding agent counterparts—because after all, that's what threat actors will be doing.</li>
      </ul>

      <p>So maybe it's a little bit ironic, but the answer to AI is AI.</p>

      <h2>Defense in Depth</h2>

      <p>The recent guidance published by CSA about the incoming "vulnerability storm" shares this same sentiment, calling out the need for:</p>

      <blockquote>"Focus on the basics and harden your environment further. Segmentation, egress filtering, multifactor authentication, and defense-in-depth/breadth all increase the difficulty for attackers."</blockquote>

      <p>The CSA guidance on Mythos really echoes the need for defense in depth and breadth, and puts the spotlight on a couple key takeaways that resonate nicely with the theme of this talk. The publication speaks to the need to use LLM-based vulnerability discovery and remediation capabilities, which is basically what we were talking about with adversarial agents.</p>

      <p>Next, we need to accelerate our teams by the use of coding agents. But again, the theme here is: use more AI for AI, and give it to more people.</p>

      <h3>The Non-Deterministic Reality</h3>

      <p>And here's the catch: We're relying on AI to secure AI. And at the end of the day, these agents are non-deterministic. So all of this is best effort.</p>

      <p>That's not to say that these controls we've been talking about are useless. If you haven't looked into implementing these things, you still should. It's still all about defense in depth. The more layers you have, the more opportunities you give yourself to catch issues that may surface.</p>

      <h2>The Platform Problem</h2>

      <p>So now that we have this awesome list of security controls we can implement specifically to secure our software development life cycle for AI, we're good, right?</p>

      <p>Well, kind of. Even if you've fully explored and implemented all the things we just talked about, and the efficacy rate of those controls is 100% (it's not 100%), we still have something I'm going to call the <strong>platform problem</strong>, and it kind of throws a wrench into our plans.</p>

      <h3>The AI Coding Companion Landscape</h3>

      <p>The issue is that it's a relatively nascent sector, so we're seeing all kinds of options. Which is a good thing in that you have a lot of choices, but it's also a bad thing because now you have to secure them all. And of course, each of these is generally a bespoke configuration, so you're not going to be able to apply blanket policies to cover all of them.</p>

      <p>For example:</p>

      <ul>
        <li><strong>Claude Code</strong> is quickly emerging as a leading AI coding agent, but its enterprise controls are still maturing. Policy enforcement is typically decentralized, relying on local configuration, meaning you'll need to deploy your configurations across your infrastructure or locally on developer endpoints, rather than a centralized admin console. Which means these policies are also more difficult to enforce.</li>

        <li><strong>Cursor</strong> offers similar flexibility through local configuration while also providing a centralized admin interface for managing organization-level settings.</li>
      </ul>

      <p>And as far as I know, this isn't a paid advertisement for Cursor… if there's anybody from Cursor here we can talk after.</p>

      <p>I'm not suggesting you use any of these platforms over the other, but my point is they all have different nuances to their configuration and deployment. So when you're looking to harden these AI coding companions, you're going to make your life difficult if you try to support them all. <strong>So pick one. Or two. And push people towards using them.</strong></p>

      <h2>Shadow IT: AI Coding Platforms</h2>

      <p>So the previous slide we were talking about different AI-assisted coding agents. There also exists the concept of <strong>AI coding platforms</strong> which not only help write code but also deploy and host the code.</p>

      <p>This is shadow IT all over again, and something to look out for if people are playing with these tools without approval or additional security hardening and visibility.</p>

      <h3>The Democratization Continues</h3>

      <p>This was also predicted in Anthropic's 2026 trends: <strong>"Non-technical use cases expand across organizations"</strong> — "Coding capabilities democratize beyond engineering: Non-technical teams across sales, marketing, legal, and operations gain the ability to automate workflows and build tools with little or no engineering intervention or coding expertise."</p>

      <p>Going back to the idea of the democratization of software development, you have vendors like <strong>Lovable, Vercel, Replit</strong>, etc. that are essentially no-code solutions marketed towards enabling non-technical individuals to build and deploy applications at the push of a button. That means not only creating the frontend and backend, but also your database, your lambdas, your WAF rules—they're all configured by their agents on their metal.</p>

      <p>As we try to move fast in a world where speed is everything, more people will be drawn and pushed to use these tools to unblock themselves, to improve their workflows, and to deliver more value using AI.</p>

      <p>And that's not a bad thing. AI, when used properly, is a powerful tool. And in this case it's leveling the playing field in terms of giving people the agency to innovate, to bring their ideas to life, and to build things that matter to them. And it's our role as builders with experience in this realm to make sure we're setting these people up for success.</p>

      <h2>The Vendor Assessment Gap</h2>

      <p>So as you're going forward and if you're looking to implement some of these platforms, you'll probably run through your typical vendor assessment flow. And they're probably going to check all the boxes. They'll have their SOC 1, SOC 2, ISO 27001. They'll do pen testing, they'll have their data encrypted.</p>

      <p>But that's just the foundation. You have to consider all the building blocks they give you and all the different ways they can be arranged. When you give people the agency to assemble those blocks any number of ways they want, there are no guarantees in security.</p>

      <p>Take AWS, for example. The platform gives you all the tools to succeed, but it's not AWS's fault if you create a vulnerable app, misconfigure your IAM policies, or leave an S3 bucket public by accident.</p>

      <h3>The Responsibility Problem</h3>

      <p>It's the same for these no-code AI building platforms. It's not just magic, unfortunately. There's lots of infrastructure involved—whether it's AWS, GCP, Azure, it's all there, just opaque. And it's ultimately on the user to make sure they've configured their application properly. It's all the responsibility, and no—to limited—visibility. And when you put these tools in the hands of people with no coding experience, without any DevOps experience, it's not surprising that things can get spicy.</p>

      <h2>Case Study: Lovable</h2>

      <p>Speaking of spicy, we can take a look at a real case study with Lovable.</p>

      <p>You might have seen a post in the cybersecurity subreddit last month about someone "vibe-hacking" a Lovable app. In just a few hours they were able to obtain:</p>

      <ul>
        <li>18,697 user records (names, emails, roles) — no auth needed</li>
        <li>Account deletion via single API call — no auth</li>
        <li>Student grades modifiable — no auth</li>
        <li>Bulk email sending — no auth</li>
        <li>Enterprise org data from 14 institutions</li>
      </ul>

      <p>Since then, it's been reported that Lovable investigated these issues.</p>

      <h3>Testing It Today</h3>

      <p>Fast forward now to today, about a month or two later. If you were to create an app in Lovable with a basic prompt like "Create an app that allows people to sign up, read comments, and post replies," what would you expect to happen?</p>

      <p>We would hope that it just works and we get an app where users can sign up and authenticate. We want our comments and replies stored in a database. Pretty basic as far as apps go.</p>

      <p>Well, it's actually not exactly what we wanted. The way things are architected, there also happens to be a hardcoded key in the source code which also happens to grant anyone direct database access.</p>

      <h3>The Support Response</h3>

      <p>So now it's like, oh great. I have my app that's public on the internet, and now it's got anonymous, direct database read/write access as a feature. So let's contact Lovable for help because I can't remove and rotate this key since it's not my infrastructure.</p>

      <p>You get a reply from their AI support bot Sam basically saying this hardcoded key is intended by design and this is happening because we didn't configure Row Level Security policies, of course. Oh right, RLS—why didn't I think of that!</p>

      <p>Which is maybe fair. But when the platform is marketed towards enabling non-technical individuals, how are they expected to know what row level security is? Let alone know that they need to set it up when they've never even heard of it before?</p>

      <p>That's not to say there aren't controls in the Lovable platform you can configure to try and help prevent this kind of thing. But as we can see, it's certainly not secure-by-default.</p>

      <p>And yes, you likely would have caught this if someone had reviewed the code or if it was hooked up to your secrets detection scanning. But of course, this entire platform is outside of our standard CI/CD pipeline, so none of those defensive layers translate.</p>

      <h2>Outside the Security Perimeter</h2>

      <p>And that's one of the core issues here. <strong>These platforms exist outside your existing security perimeter.</strong></p>

      <ul>
        <li>Your SIEM doesn't see them</li>
        <li>Your detection and response teams don't have access to logs</li>
        <li>Your IDSes aren't running</li>
        <li>Your secrets detection scanning isn't plugged in</li>
        <li>Your branch protection policies and code review processes don't apply</li>
        <li>The code's not even necessarily in GitHub</li>
        <li>Any tests you have in CI are skipped, including any dependency scanning you might normally have</li>
      </ul>

      <p>That said, these platforms are great for prototyping and enabling everyone (and I mean everyone) to self-serve in terms of leveraging AI to improve their workflows. But we have to be careful about how we introduce these tools, what sort of data we're putting in them, and that we're doing our own due diligence to shepherd people in the right direction by creating safe guardrails for them to build and experiment with AI.</p>

      <p>These tools are powerful. There's no doubt about that. But with great power comes great responsibility.</p>

      <h2>The Reality Check</h2>

      <p>And the fact of the matter is that a lot of the people looking to use these platforms often don't have the technical or security backgrounds to shoulder that responsibility on their own.</p>

      <p>They're not developers. They're not security engineers. They're just trying to solve a problem quickly.</p>

      <h2>Recommendations</h2>

      <p>So what should we do?</p>

      <h3>1. Be Opinionated About Platform Choices</h3>

      <p>First, we need to be opinionated when it comes to choosing what platforms we want to use and how we want to use them, and make sure everyone is aligned on that. It's fine to evaluate a handful of different solutions. But when it comes to seriously using them, we can't just support every single snowflake AI coding agent out there—we have to pick one or two and commit to supporting them from top down.</p>

      <p>Otherwise, it's just going to be the wild west. As we've seen, they're not just ready to go out of the box. While they're easy to get up and running, they're going to need more investment to be in parity with all of the compliance, privacy, legal, security, engineering, etc. requirements we have.</p>

      <h3>2. Invest in Internal Infrastructure</h3>

      <p>Second, I think this is really where we have an opportunity. People are looking to use these tools because they're easy to use, fast to iterate on, and quick to deploy.</p>

      <p>So we need to continue investing in our own infrastructure. We need to bridge the gap between how much easier it is to deploy on these external platforms versus internally with our own infrastructure. Or at the very least, we need to make it possible for our infrastructure to accommodate these AI coding platforms and make sure there's a golden path to building and deploying with these tools.</p>

      <p>This is kind of idealistic, but I think because if nothing else, the introduction of all these AI hosting platforms can expose how much friction there is in some of our own development pipelines. Putting them side-by-side really shows us and lets us visualize how much better things could be. If it was as easy to ship apps in our own infrastructure, no one would have a reason to even look at these other platforms.</p>

      <h2>Conclusion</h2>

      <p>My last note is basically to say: AI is here. It's everywhere, and adoption is only ramping up. It's not just software engineers using it anymore. Which is why it's more important than ever that we have all these defense-in-depth controls implemented alongside our AI coding pipelines. They're essentially our training wheels, and we need them.</p>

      <p>The next thing you know, your parents won't be calling you about the printer anymore—they're gonna be vibe coding a startup and asking you what a 500 is.</p>

      <h2>Acknowledgments</h2>

      <p>Special thanks to:</p>
      <ul>
        <li>Brooks McMillin for the slide layout</li>
        <li>Adrian Wood and Jonathan Hawes for data on the Lovable vulnerability</li>
      </ul>

      <h2>References</h2>

      <ul>
        <li><a href="https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf" target="_blank">Anthropic's 2026 Agentic Coding Trends Report</a></li>
        <li><a href="https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/04/mythosready-20260413.pdf" target="_blank">CSA - Mythos Vulnerability Storm Guidance</a></li>
        <li><a href="https://www.reddit.com/r/cybersecurity/comments/1rffin3/i_vibe_hacked_a_lovableshowcased_app_16/" target="_blank">Reddit - Vibe-hacking a Lovable app</a></li>
        <li>CodeRabbit - "The State of AI vs Human Code Generation"</li>
        <li>SonarSource Developer Survey</li>
      </ul>
    `,
  },
};
