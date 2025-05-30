## Competitor Insights Assistant

### Overview

At Mobal, we help restaurants and local businesses win in local search. One powerful way to improve online visibility is understanding how your business profile stacks up against competitors and knowing what to improve.

Your task is to build a prototype of the **Business Profile Comparator,** a tool that compares a business profile against similar competitors and recommends improvements using AI.

This task is designed to test your full-stack capabilities, AI integration skills, product thinking, and scoping judgment.

---

### The Use Case

As a restaurant owner, I want to:

- See how my online profile compares to competitors
- Identify missing content (photos, reviews, business hours, etc.)
- Understand how I can improve my profile to attract more customers

---

### Core Features

**Input Interface**

- Allow the user to enter a business name or website
- Optionally, let the user select nearby or similar competitors

**Backend Engine**

- Build a basic backend in Node JS with TypeScript
- Mock or use real APIs (e.g. Serper.dev) to fetch business profile data
- Compare key attributes:
    - Review count and average rating
    - Number of images
    - Presence of critical fields (hours, description, menu links, etc.)

**AI Integration**

- Use an LLM to generate a comparison summary and concrete suggestions
- Output suggestions like:
    
    > “You're missing photos. Your competitors average 20+.”
    > 
    > 
    > “You haven’t responded to recent reviews — consider replying to stay relevant.”
    > 
- The AI integration can be implemented however you like (OpenAI, local models, etc.)

---

### Optional Enhancements (not required)

- Profile score or ranking
- Charts for visual comparison
- Preview improvements using AI-generated content
- Style or tone toggles (e.g., “casual” vs “data-driven” suggestions)

---

### What We’re Evaluating

- **Product thinking**: What’s your MVP? What did you leave out and why?
- **Engineering**: Clear, well-structured code; basic frontend + backend; working prototype
- **AI usage**: Creative and practical use of LLMs to deliver useful insights
- **APIs/scraping**: Even mocked data is fine, but show that you understand how external integrations could work

---

### Constraints & Timeline

- This should take **1-2 days max** depending on your scope decisions
- You’re free to mock any parts of the data or use real APIs
- We encourage you to use as much AI as possible, but you need to be able to explain the code.
- Use ReactJS + Node js with typescript if possible,tailwind css, but feel free to use what you're fastest with
- Final deliverable:
    - GitHub link or ZIP with your code
    - A short README explaining:
        - What you built
        - What you skipped and why
        - How to run the project
        - What you'd improve with more time