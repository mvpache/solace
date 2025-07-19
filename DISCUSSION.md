# Discussion

## Instructions
1. Fix any glaring bugs and anti patterns.
2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

## TODOS

- [x] Hydration error on load
- [x] Missing Key in list
- [x] Advocate Type errors
- [ ] Design Refresh
- [x] Search Upgrade
  - [x] We are setting innerHTML for the search field instead of managing in state
  - [x] Search is agaisnt the advocates list in state, this will become unperformant as we add more advocates to the db, make an api call for search
  - [x] We should be able to search certain fields specifically, ie PhD in New York with 10 years of expierence or more
  - [ ] Stretch: Add a debounce to search inputs so we dont search until 2secs of inactivty