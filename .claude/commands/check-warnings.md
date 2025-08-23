# Claude Command: Check Warnings

This command analyzes and helps resolve TypeScript compiler warnings, ESLint issues, and build warnings in your Next.js project.

## Usage

```
/check-warnings
```

## What This Command Does

1. **TypeScript Analysis**: Runs `npx tsc --noEmit` to check for TypeScript compiler warnings
2. **ESLint Analysis**: Runs `npm run lint` to identify code quality and style issues
3. **Build Analysis**: Runs `npm run build` to catch build-time warnings and errors
4. **Warning Categorization**: Groups warnings by type (type errors, unused variables, accessibility, etc.)
5. **Priority Assessment**: Identifies critical warnings that should be addressed immediately
6. **Fix Suggestions**: Provides specific recommendations for resolving each warning type
7. **Batch Resolution**: Offers to fix common warning patterns automatically when safe
8. **Report Generation**: Creates a summary of all warnings with their locations and solutions

## Warning Categories

### High Priority Warnings
- **Type Errors**: TypeScript type mismatches, missing type definitions
- **Build Failures**: Compilation errors that prevent successful builds
- **Runtime Issues**: Potential runtime errors caught by static analysis
- **Security Issues**: ESLint security-related warnings

### Medium Priority Warnings
- **Unused Code**: Variables, imports, functions that aren't used
- **Code Style**: ESLint formatting and convention violations
- **Performance**: Inefficient React patterns, unnecessary re-renders
- **Accessibility**: Missing ARIA attributes, semantic HTML issues

### Low Priority Warnings
- **Documentation**: Missing JSDoc comments
- **Code Organization**: Import ordering, file structure suggestions

## Automated Fixes

The command can automatically resolve:
- Remove unused imports and variables
- Fix ESLint auto-fixable issues with `--fix` flag
- Add missing type annotations for simple cases
- Convert deprecated React patterns to modern equivalents
- Fix common Next.js configuration issues

## Manual Fix Guidance

For warnings requiring manual attention, the command provides:
- Exact file location (`filename:line:column`)
- Clear explanation of the warning
- Recommended solution with code examples
- Link to relevant documentation when applicable

## Integration with Next.js

- Works with your current Next.js and TypeScript configuration
- Respects ESLint configuration and extends
- Compatible with Tailwind CSS and PostCSS setup
- Handles both App Router and Pages Router patterns

## Best Practices

- **Regular Cleanup**: Run this command before major commits
- **Zero Warnings Policy**: Aim to maintain a warning-free codebase
- **Incremental Fixes**: Address warnings as they appear rather than accumulating
- **Team Standards**: Use consistent approaches to warning resolution

## Example Output

```
📊 Warning Analysis Complete

🔴 High Priority (2 warnings):
- components/Navigation.tsx:23:8 - Type 'string | undefined' is not assignable to type 'string'
- app/page.tsx:15:5 - Variable 'data' is used before being assigned

🟡 Medium Priority (5 warnings):
- Unused import 'React' in components/ErrorBoundary.tsx
- Missing 'alt' attribute on img element in app/page.tsx:42
- React Hook useEffect has missing dependencies: ['userId'] (react-hooks/exhaustive-deps)

🟢 Low Priority (1 warning):
- Missing JSDoc comment for function 'getSiteConfig' in lib/content.ts

💡 Auto-fixable: 3 warnings can be resolved automatically
```

## Command Options

- `--auto-fix` - Automatically resolve safe warnings without confirmation
- `--category [high|medium|low]` - Filter warnings by priority level
- `--file [path]` - Analyze warnings in specific files only
- `--export` - Export warning report to markdown file
- `--typescript-only` - Run only TypeScript compiler checks
- `--eslint-only` - Run only ESLint analysis