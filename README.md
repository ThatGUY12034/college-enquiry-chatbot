# CampusAsk – College Enquiry Chatbot (NLP)

A college enquiry chatbot that understands students' questions using classic Natural Language Processing,
running entirely in the browser (no server, no API key).

## NLP pipeline
1. **Tokenization** – lower-casing and splitting the question into word tokens.
2. **Normalization** – mapping synonyms and abbreviations to one term (e.g. *cost → fees*, *hostel → accommodation*).
3. **Stop-word removal** – dropping words such as *the, is, what* that carry little meaning.
4. **Stemming** – reducing words to their root with the Porter stemmer (*placements → placement*, *examinations → examin*).
5. **TF-IDF vectorization** – each training question in the knowledge base becomes a TF-IDF vector.
6. **Cosine similarity** – the question vector is compared with every training question; the best intent wins
   if its similarity is at least 0.30, a clarification is asked between 0.12 and 0.30, and a fallback reply is used below that.

The **NLP Inspector** panel shows every step for the last question.

## Project structure
```
index.html        Page layout
style.css         Styles (responsive)
js/nlp.js         Tokenizer, stop words, synonyms, Porter stemmer, TF-IDF index, cosine similarity
js/knowledge.js   Intents, example questions and answers
js/app.js         Chat logic, intent classification and UI rendering
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 5500
```
then visit http://localhost:5500.

Answers give general guidance. Exact fees, cut-offs and dates are not invented; the bot points students to the
official college and State CET Cell notices.
