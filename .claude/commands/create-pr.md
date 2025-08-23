# Claude Command: Create Pull Request

This command creates a pull request from the current branch merging into the main branch using GitHub CLI.

## Prerequisites

1. Install GitHub CLI if you haven't already:

   ```bash
   # macOS
   brew install gh

   # Windows
   winget install --id GitHub.cli

   # Linux
   # Follow instructions at https://github.com/cli/cli/blob/trunk/docs/install_linux.md
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

## Usage

```
/create-pr
```

Or with custom target branch:
```
/create-pr --base develop
```

## What This Command Does

1. **Branch Detection**: Automatically detects current branch as source branch
2. **Target Branch**: Defaults to `main` branch unless `--base` option is specified
3. **Change Analysis**: Reviews commits on current branch compared to target branch
4. **PR Description**: Generates structured description based on commit analysis
5. **Title Generation**: Creates conventional commit-style title with appropriate emoji
6. **Draft Creation**: Creates as draft PR by default for review before marking ready
7. **Attribution**: Never Attribute Claude or Anthropic

## Default Behavior

- **Source Branch**: Current git branch (automatically detected)
- **Target Branch**: `main` (can be overridden with `--base` option)
- **PR State**: Draft (use `--ready` flag to create as ready for review)
- **Description**: Generates structured PR description from commit analysis

## Basic Command Structure

```bash
# Create PR from current branch to main (default)
gh pr create --title "✨(scope): Your descriptive title" --body-file pr-description.md --base main --draft

# Create PR to different base branch
gh pr create --title "✨(scope): Your descriptive title" --body-file pr-description.md --base develop --draft

# Create ready-for-review PR
gh pr create --title "✨(scope): Your descriptive title" --body-file pr-description.md --base main
```

## Best Practices

1. **PR Title Format**: Use conventional commit format with emojis

   - Always include an appropriate emoji at the beginning of the title
   - Use the actual emoji character (not the code representation like `:sparkles:`)
   - Examples:
     - `✨(supabase): Add staging remote configuration`
     - `🐛(auth): Fix login redirect issue`
     - `📝(readme): Update installation instructions`

2. **Description Structure**: Generated PR descriptions include:

   - **Summary**: Overview of changes made
   - **Motivation**: Why the change is needed
   - **Changes**: List of key modifications
   - **Testing**: How changes were verified
   - **Additional Notes**: Any relevant context or considerations

3. **Content Guidelines**: Ensure your PR description is:

   - Clear and concise
   - Focused on the "why" behind changes
   - Includes testing information when applicable
   - References related issues when relevant

4. **Draft PRs**: Start as draft when the work is in progress
   - Use `--draft` flag in the command
   - Convert to ready for review when complete using `gh pr ready`

### Common Mistakes to Avoid

1. **Vague Titles**: Avoid generic titles like "Fix bug" or "Update code"
2. **Missing Context**: Don't assume reviewers know the background
3. **No Testing Info**: Always explain how changes were tested
4. **Large Scope**: Keep PRs focused on a single feature or fix

## Additional GitHub CLI PR Commands

Here are some additional useful GitHub CLI commands for managing PRs:

```bash
# List your open pull requests
gh pr list --author "@me"

# Check PR status
gh pr status

# View a specific PR
gh pr view <PR-NUMBER>

# Check out a PR branch locally
gh pr checkout <PR-NUMBER>

# Convert a draft PR to ready for review
gh pr ready <PR-NUMBER>

# Add reviewers to a PR
gh pr edit <PR-NUMBER> --add-reviewer username1,username2

# Merge a PR
gh pr merge <PR-NUMBER> --squash
```

## Using Templates for PR Creation

To simplify PR creation with consistent descriptions, you can create a template file:

1. Create a file named `pr-template.md` with your PR template
2. Use it when creating PRs:

```bash
gh pr create --title "feat(scope): Your title" --body-file pr-template.md --base main --draft
```

## Command Options

- `--base [branch]` - Specify target branch (defaults to `main`)
- `--ready` - Create PR as ready for review instead of draft
- `--title [title]` - Override auto-generated PR title
- `--reviewers [users]` - Add reviewers to the PR
- `--assignee [user]` - Assign the PR to a user

## Branch Workflow

### Standard Workflow
1. Work on feature branch: `feature/new-navigation`
2. Run `/create-pr` - Creates PR from `feature/new-navigation` → `main`
3. Review and merge into `main`

### Custom Base Branch
1. Work on feature branch: `feature/experimental-ui`
2. Run `/create-pr --base develop` - Creates PR from `feature/experimental-ui` → `develop`
3. Review and merge into `develop`

## Automatic Branch Detection

The command will:
- Get current branch name using `git rev-parse --abbrev-ref HEAD`
- Verify branch is not `main` (prevents creating PR from main to main)
- Check if current branch has commits ahead of target branch
- Warn if branch is behind target branch and needs rebasing

## Related Documentation

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI documentation](https://cli.github.com/manual/)

## Integration with Other Commands

- `/commit` - Creates well-formatted commits before PR creation
- `/check-warnings` - Ensures code quality before submitting PR