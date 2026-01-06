# Assignment: AI-Powered Email Template Generator

## Problem Statement
Design and implement a backend microservice that generates email templates using AI, based on a small set of input fields. The service must expose a POST API, log AI response times, maintain a modular structure, and securely handle API keys using environment variables.

This repository contains the complete implementation for **Assignment 2** as per the given requirements.

---

## Tech Stack Used
- **Backend Framework:** Node.js + Express.js  
- **AI Provider:** OpenAI (Responses API)  
- **Validation:** Zod  
- **Logging:** Custom file-based logger  
- **Environment Management:** dotenv  

---

## Assignment Requirements Mapping

| Requirement | Implementation |
|------------|----------------|
| POST API with `{ purpose, recipient_name, tone }` | `/api/email/generate` |
| AI generates short email template | Implemented via OpenAI API |
| Response time logging for AI calls | Logged using timestamp difference |
| Modular structure | Controller, Service, Routes, Middleware separation |
| Env variable handling for API keys | `.env` + `.env.sample` |
| Clean controller/service separation | `email.controller.js` → `Email.service.js` |

---
## Project Structure

```
EMAILTEMPLATEGENERATOR
├── logs/
│   └── app.log
│
├── src/
│   ├── configs/
│   │   └── ai.config.js
│   │
│   ├── controllers/
│   │   └── email.controller.js
│   │
│   ├── middlewares/
│   │   ├── email.schema.js
│   │   └── requestLogger.js
│   │
│   ├── routes/
│   │   └── email.routes.js
│   │
│   ├── services/
│   │   ├── email.service.js
│   │   └── email.system.txt
│   │
│   ├── utils/
│   │   └── logger.js
│   │
│   ├── app.js
│   ├── constants.js
│   └── index.js
│
├── .env
├── .env.sample
├── package.json
├── package-lock.json
└── README.md
```

---

## Explanation of Core Components

### Controller (`email.controller.js`)

* Handles incoming API requests
* Validates request body using Zod schema
* Calls the service layer
* Sends formatted success or error responses
* Handles validation and runtime errors

### Service (`Email.service.js`)

* Loads the system prompt from `email.system.txt`
* Calls the AI API
* Measures AI response time
* Returns the generated email template and response time

### System Prompt (`email.system.txt`)

* Defines the role of the AI as an email template writer
* Enforces tone-specific greetings
* Ensures reusable and professional templates
* Prevents hallucination of dates, links, or locations
* Allows placeholders such as `{{sender_name}}` and `{{payment_link}}`

### Validation Middleware (`email.schema.js`)

* Ensures required fields are present
* Restricts tone values to predefined options
* Prevents numeric-only or empty input
* Enforces character limits

### Request Logger (`requestLogger.js`)

* Logs all incoming requests
* Captures HTTP method, route, and request body

### Logger Utility (`logger.js`)

* Writes structured logs to `logs/app.log`
* Used across controllers and services

---

## API Details

### Endpoint

```
POST /api/email/generate
```

### Request Body

```json
{
  "purpose": "Birthday Invite of Subhranil",
  "recipient_name": "Wasiq",
  "tone": "informative"
}
```

### Allowed Tone Values

```
friendly
professional
formal
polite
neutral
confident
supportive
urgent
apologetic
informative
```

---

## Sample Success Response 

```json
{
  "success": true,
  "data": {
    "email": "**Subject:** Invitation to Subhranil's Birthday Celebration\n\nHello Wasiq,\n\nI am pleased to extend an invitation to Subhranil's upcoming birthday celebration. The event is scheduled to take place on [date] at [time], at [location]. It promises to be a joyous occasion filled with fun, laughter, and heartfelt moments.\n\nYour presence at the celebration would be greatly appreciated as we gather to commemorate this special day with Subhranil. Please mark your calendar and RSVP by [RSVP date] using the following link: {{RSVP_link}}.\n\nIf you have any questions or need further details, please feel free to reach out. We look forward to celebrating this memorable day with you.\n\nWarm regards,\n\n{{sender_name}}",
    "responseTimeMs": 3142
  }
}
```
### Success Response 2: 
### Request Body

```json
{
  "purpose": "Casual team meetup invitation",
  "recipient_name": "Aman",
  "tone": "friendly"
}
```
---

## Sample Success Response 

```json
{
  "success": true,
  "data": {
    "email": "**Subject:** Join Us for a Casual Team Meetup!\n\nHi Aman,\n\nWe hope you're doing great! We are excited to invite you to join us for a casual team meetup where we can relax, have fun, and strengthen our team bonds outside of work.\n\nThe meetup will be an opportunity to socialize, share laughs, and get to know each other better in a laid-back setting. Your presence would add to the enjoyment of this gathering, and we look forward to spending some quality time together.\n\nDetails regarding the venue and time will be shared shortly. If you have any preferences or suggestions, feel free to let us know. Your input is valuable to us.\n\nWe hope you can make it! Looking forward to a fun and memorable time together.\n\nWarm regards,\n{{sender_name}}",
    "responseTimeMs": 3122
  }
}
```

* `email` → AI-generated reusable email template
* `responseTimeMs` → Time taken by AI to generate the response (in milliseconds)

---
## Sample Error Responses (Validation Failures)

The following examples are taken directly from **actual application logs** and demonstrate how the system handles invalid input using Zod validation.

---

### Error Case 1: Empty Purpose Field

**Endpoint** POST /api/email/generate

**Request Body**
```json
{
  "purpose": "",
  "recipient_name": "Wasiq",
  "tone": "informative"
}
```

**Validation Error Response (400)**
```json
{
  "success": false,
  "errors": [
    {
      "field": "purpose",
      "message": "Field cannot be empty"
    }
  ]
}
```
**Explanation**

- The purpose field is required and cannot be empty.
- The request is rejected before calling the AI.
- Error details are logged in logs/app.log.
---

## Error Case 2: Invalid Tone Value
**Endpoint** POST /api/email/generate

**Request Body**
```json
{
  "purpose": "Welcome message",
  "recipient_name": "New User",
  "tone": "casual"
}
```

**Validation Error Response (400)**
```json
{
  "success": false,
  "errors": [
    {
      "field": "tone",
      "message": "tone must be one of: friendly, professional, formal, polite, neutral, confident, supportive, urgent, apologetic, informative"
    }
  ]
}
```
**Explanation**

- The value casual is not part of the allowed tone enum.
- Strict tone validation ensures consistent AI output.
- The AI service is not called when validation fails.

---
### Additional Note on Use Cases & Testing Evidence

All successful requests, validation failures, and AI response timings shown above are taken from **real executions** of the service.

To review **all tested use cases**, including:
- Valid email generation requests
- Validation error scenarios
- AI response time measurements
- Request and response payloads

refer to the application log file at the following path: /logs/app.log

This log file serves as the complete execution record for the assignment and provides verifiable proof of all API behaviors and edge cases tested during development.

---
## Error Handling

### Validation Error (400)

Returned when request input fails schema validation.

### Internal Server Error (500)

Returned when AI generation or server execution fails.

---

## AI Response Time Logging

* AI call start and end times are captured inside the service layer
* Response time is calculated in milliseconds
* Logged into `logs/app.log`
* Also returned in the API response

---

## Environment Variables

Create a `.env` file using the following structure:

```env
PORT=8080
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_MODEL=gpt-3.5-turbo
```
---

## Models Tested & Recommendation

I have tested multiple OpenAI models to compare latency and output quality.

**Observation / Recommendation:**
Among the models tested, **`gpt-3.5-turbo`** provided the best balance of **speed + response quality** for this assignment (fast responses with reliable, well-structured templates). Use `gpt-3.5-turbo` as the default for typical usage; switch to a `gpt-4` variant only if you need **higher-quality text** and can accept **increased latency and cost**.


## How to Run the Project

```bash
npm install
npm run start
```

Server runs on:

```
http://localhost:8080
```

---
# How the AI Prompts Were Designed

The prompt lives in `src/services/email.system.txt` and is sent as the **system** role to the model. It was crafted to make outputs deterministic, reusable, and assignment-compliant by combining: a clear role, strict rules, tone mappings, concise constraints, and worked examples.

## Key design decisions

* **Clear role & task:** The prompt opens by assigning the model the role “professional email template writing assistant” and restricts its job to generating reusable email *templates* only (no explanations or metadata).
* **Limited inputs:** The model is instructed to use only three inputs — `purpose`, `recipient_name`, and `tone` — so outputs depend solely on those fields and are reproducible.
* **Tone guidelines + greeting mapping:** Each allowed `tone` maps to specific greetings and language style (for example, `friendly` → `Hi {{recipient_name}}`, `formal` → `Dear {{recipient_name}}`). This keeps greeting choices consistent and predictable.
* **Strict output format:** The prompt requires a subject line (`**Subject:** …`) followed by the body and a closing. It forbids extra commentary, assistant references, or inline explanations so the API returns a ready-to-send template.
* **Reusability via placeholders:** The prompt allows and encourages placeholders such as `{{meeting_link}}`, `{{payment_link}}`, and `{{sender_name}}` instead of inventing real dates/links/locations.
* **Safety & anti-hallucination rules:** The model is explicitly told **not** to invent specific dates, times, locations, or links; to avoid slang, emojis, and time-of-day greetings; and to always include the `recipient_name` exactly as provided.
* **Length & clarity constraints:** The prompt enforces a concise length target (assignment requirement) by instructing the model to keep templates short and clear (150–250 words maximum).
* **Examples:** Worked examples (invitation, reminder, follow-up) are embedded in the prompt to show the exact desired structure, tone, and phrasing—this helps steer the model toward consistent outputs.
* **Strict perspective:** The output must be written from the **sender’s** perspective addressing the recipient (never from the assistant’s perspective).


## Where the prompt is stored

```
src/services/email.system.txt
```

You can open that file to see the full system message, example inputs/outputs, tone rules, greeting lists, and prohibition rules used in production.


## Conclusion

This project demonstrates a complete, production-ready backend microservice that integrates AI for email template generation.
It fulfills all assignment requirements, follows clean architectural principles, and includes proper validation, logging, and documentation.

**Assignment completed as per specifications.**
