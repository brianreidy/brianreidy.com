---
title: It’s okay to not release a product
date: 2023/5/18
---

# It’s okay to not release a product

As a society, we often prioritize productivity and success over everything else. We measure our worth by our accomplishments and the number of products we can bring to market. However, sometimes it's important to take a step back and realize that it's okay to not release a product.

This sentiment is especially true in the tech industry, where companies and individuals are often pressured to release products quickly and frequently. However, not every feature or product is worth releasing. Sometimes, it's better to hold off on releasing something until it's truly ready, or until it aligns with your long-term goals and strategies.

Take, for example, this pull request here: https://github.com/brianreidy/brianreidy.com/pull/19/files. The feature allows for an image to change from one photo to another photo when you hover over it. The idea being i would change from a photoshopped drawing of an image to an actual photo when hovering over the image.

![Water color image of me on a bike](/brianOnBikeWaterColor.jpeg)

Water color image of me on a bike

![Original image of me on a bike](/brianOnBikeOriginal.jpeg)

Original image of me on a bike

While this may seem like a small feature, it's a perfect example of when it's okay to not release a product.

While the pull request worked and i got it running locally. I didn't like the distraction it added to my website. Even with the css opacity transition this feature felt too distracting and weird for a user. It's not a crucial aspect of the website, and I felt it was better to wait until it's a part of a larger update or redesign makes more sense in the long run. For example if i had an album of drawings with a post focused on the different tools used to convert images into water color.

I also learned more about mui through experimenting with this feature. I learned about the shouldForwardProp and I also learned how to properly type a mui styled component such that the typescript compiler doesn’t error that theme is missing from the react element. Before and after can seen below.

```ts
const Foo = styled('div'})(({ theme, isToggled }: { theme: Theme; isToggled: boolean }) => ({
  backgroundColor: isToggled ? 'blue' : 'white',
}));
...
// This would error saying i need theme and give a warning that isToggled
// This would also give a warning saying React does not recognize the `isToggled`
// prop on a DOM element. If you intentionally want it to appear in the
// DOM as a custom attribute, spell it as lowercase `isToggled` instead.
// If you accidentally passed it from a parent component, remove it from the
// DOM element.
<Foo isToggled>
```

```ts
const Foo = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isToggled',
})<{isToggled: boolen}>(({ theme, isToggled }) => ({
  backgroundColor: isToggled ? 'blue' : 'white',
}));

<Foo isToggled>

...
```

In conclusion, it's important to remember that not every feature or product needs to be released immediately. Taking the time to ensure that everything aligns with your goals and strategies, and that the product is truly ready, can lead to more success in the long run and you can also still learn along the way.
