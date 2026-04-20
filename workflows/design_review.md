# Workflow: Screenshot-Driven Design Review

## Objective
Iteratively improve HTML/CSS pages by taking screenshots, visually analyzing them, identifying issues, and making targeted fixes — repeating until the design looks right.

## Required Tools
- `mcp__Claude_Preview__preview_start` — serve the HTML file in the preview panel
- `mcp__Claude_Preview__preview_screenshot` — capture a PNG of the current state
- `mcp__Claude_Preview__preview_stop` — clean up when done
- `mcp__Claude_Preview__preview_resize` — test different viewport widths
- File Edit tool — make targeted code changes

## When To Use This Workflow
- After writing or editing any HTML/CSS file
- When the user shares a screenshot and says something looks off
- When iterating on layout, spacing, colors, typography, or responsiveness
- Anytime visual quality needs verification, not just code correctness

## Steps

### 1. Start the Preview
```
preview_start(file_path="index.html")
```
Note the URL returned. If the file is already open in the preview panel, skip this step.

### 2. Take a Screenshot
```
preview_screenshot()
```
This returns an image. **Look at it carefully** before doing anything else.

### 3. Analyze What You See
Go through this checklist visually:
- **Layout**: Does the grid/flex layout look as intended? Any overflow, misalignment, or unexpected wrapping?
- **Typography**: Are font sizes, weights, and line heights comfortable to read? Any text clipping?
- **Colors**: Does the palette feel cohesive? Sufficient contrast for readability?
- **Spacing**: Are margins and padding balanced? Does it feel cramped or too sparse?
- **Animations/Effects**: Do gradients, shadows, and borders render as expected?
- **Hero section**: Is the first impression strong and immediately readable?
- **CTA buttons**: Do they stand out? Are they big enough to click?

### 4. List Issues Found
Write out specific issues before touching any code, e.g.:
- "The nav overlaps the hero on load"
- "Card text is too small on the right column"
- "The pink button has too little padding"

### 5. Make Targeted Fixes
Edit only what's needed to fix the identified issues. Do not refactor or clean up unrelated code during a review pass.

### 6. Screenshot Again
Repeat step 2 after each meaningful change to verify the fix worked and didn't break anything else.

### 7. Test Responsive Breakpoints
```
preview_resize(width=375)   # mobile
preview_resize(width=768)   # tablet
preview_resize(width=1280)  # desktop
```
Screenshot at each size. Fix any breakpoint issues found.

### 8. Stop Preview When Done
```
preview_stop()
```

## Edge Cases
- **Screenshot looks blank**: The file path may be wrong or the preview hasn't loaded yet. Try stopping and restarting.
- **Fonts not loading**: Google Fonts requires internet access. If offline, fall back to system serif/sans-serif for testing.
- **Animations not visible in screenshot**: Screenshots are static. Describe animation intent in comments for the user to verify live.

## Output
A visually verified HTML file with documented changes made, and a short summary of what was fixed and why.
