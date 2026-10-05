# Derby Music Assignments

A browser-based music assignment system for Derby band.

Students open a dedicated assignment link, read three short paragraphs, answer one multiple-choice and two short-answer questions, and download a completed PDF for Google Classroom.

## Teacher workflow

- Open `?library=1` for the Assignment Library.
- Published assignments have permanent short links such as `?a=vivaldi-four-seasons`.
- Open `?builder=1` to start a clean assignment.
- **Save Draft** keeps a working copy in that browser.
- **Publish Permanently** opens a pre-filled GitHub publish request. Only publish requests created by the repository owner's GitHub account are accepted.
- The GitHub Action validates the assignment, stores it in `assignments.json`, regenerates `assignment.js`, refreshes the cache version, comments with the permanent student link, and closes the request.
- Use **Export Drafts** / **Import Drafts** to back up browser-only drafts.
- Published assignments can be edited in place or duplicated as the starting point for a new assignment.

Student answers remain in the student's browser and are not uploaded to the repository.
