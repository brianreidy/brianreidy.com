---
title: How to compose components in React
date: 2023/3/31
type: blogs
---

# Component Composition

React's ideal component composition depends on the specific application needs. Generally speaking, React components should be small and focused on a specific behavior.

## Presentation Components

Starting at the leaves of a tree it's best practice to make components reusable and independent, as they should only perform the tasks they were designed for. These types of components are known as **presentational components** and they should be:

- free of business logic
- resuable
- mostly/usually stateless
- most of the code is in the render method / not a lot of js

examples:

- Call to action component that displays a specifc background color.
- Button
- Table
- Badge (Shown Below)

```ts
const BadgeWrapper = styled('div')(({ theme, color }) => ({
  backgroundColor: color ?? theme.palette.background.default,
  borderRadius: '10px',
  display: 'inline-block',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px 10px',
}));

const Badge = ({ children, color, darkMode: darkModeProp }: BadgeProps) => (
  <BadgeWrapper color={color}>
    <h3>{children}</h3>
  </BadgeWrapper>
);
```

These components are highly reusuable. The business logic is only to by propped in and never to be contained inside the component. Each **presentational component** should be given to the designer to use across the application/page.

## Container Components

**Container components** are where:

- most of the business logic happens
- not really resuable
- not a lot in the render method besides **presentational components**

Examples:

- Request for songs by X artist and feeding them into a list
- Request for author information and proping them into a badge (shown below)

```ts
export default function AuthorSection({ bookId }) {
  const [author, setAuthor] = useState(undefined);
  useEffect(() => {
    setAuthor(fetchAuthor(bookId));
  }, [bookId]);
  if (!author) return null;
  return (
    <AuthorInfo>
      <TextBadge color="green">{author.name}</TextBadge>
      <AuthorSummary color="gray">{author.summary}</AuthorSummary>
    </AuthorInfo>
  );
}
```

Finally, React components should be as modular as possible, and each should be composed of smaller components. It's good to have **presentational components** contain other **presentation components** if those components get used in multiple places. For example the Call To Action (a component that wraps its children and sets the background color to the business color) can render a Card Component that gets used in other places. The same rule applies for **container components**. Modular components are easier to troubleshoot and modify.
