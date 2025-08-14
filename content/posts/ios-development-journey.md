---
title: "Building My First iOS App Using AI (Pt 1)"
date: "2025-08-14"
description: "Can a non-developer build an iOS app using only AI (LLMs) and basic programming understanding?"
tags: ["ai", "ios", "swift", "mobile-dev", "case-study"]
status: "published"
---

### Background

Let's revind a bit. Back in 2017, I moved to iOS for the first time, and was on a hunt for an ebook reader for reading my EPUBs (an ebook file format). There were quite a few options. 

Kindle and Apple Books were an option but both had some issues. Kindle required a different ebook format called .MOBI, that would require me to convert all my books. On the other hand, Apple Books worked just fine - but it offered very less customizations and app was bloaty. And as usual, both were heavy in pushing towards their eBook Marketplace, because at the end of the day, these were businesses.

That is when I found [Marvin](http://www.appstafarian.com), a simple ebook reader by Appstafarian.

And it was perfect. For me, at least.

- It had a customizable library view, so I could get rid of the ugly grid view, and just have a cover image with Title. 
- And since my move to iOS came with iPhone 7, with its new fancy haptic motor with fine control, you could add subtic haptic feedback on page scrolls. 
- Font and customizability inside reader was excellent.
- It also had native Calibre support
- And it was fast. No jank, no bloat.

And so I was content.

BUT then over the next couple of years, Marvin stopped updating. I remember the biggest change was when I moved to iPhone XS back in mid 2019, I realized there was no update for the notch iPhones. It still worked okay, but some subtle header/footer had issues.

### The Tragedy

Marvin officially got [removed from App Store](https://www.mobileread.com/forums/showthread.php?t=353769) in 2023. I found this when I upgraded to iPhone 15 Pro (late 2023) and found I had jump over ten hoops to get it back.

So I searched for a replacement - but nothing scratched my itch. Yomu, BookFusion, and others were all capable ebook readers with their own pros and cons - I even paid for some of them, but alas - no.

So I thought - why not build one?

### First Steps

So, I tried picking this up back then in late 2023, before the advent of a lot of these LLM tools. Yeah, picking up such a large project as this, a full fledged ios ebook reader app is -ahem- ambitious to say the least. I did build a couple of sample apps, and attempted to create more complex apps, but lack of client programming background and the daunting task in front of me demotivated me a lot. 

Till then, I had only worked with python professionaly, for analytics and that too, from a scriping and analytics point of views. Parsing data, processing analytical insights and visulization is all I had worked with.

So I carried on.

### Attention Is All You Need

I have had my reservations about AI and LLMs.. and in some ways, I still do.

Seeing early ML progress, before the advent of Transformer model, through different breakthroughs around early neural network architectures like RNNs and LSTMs - the early output of transformer models was impressive, but I did not forsee the impact they would create.

Putting aside the ethical dilemmas and data training concerns for a moment, I still believe a lot more needs to happen before AI can be truly useful for complex business problems where goals are hard to define. 

However, one thing these models have gotten exceedingly good at, since the advent of reasoning capabilities, is handling boilerplate code and detecting patterns, which are essential to coding practices.

### AI gets better.. and cheaper

Couple of months back, in June 2025, I revisted my earlier goal. 

> Build a simple ebook app, that is tailored to my exact needs.

Being a side project, I could not work much on it during the week - so I started off cautiously optimistic. I tried combination of Cursor, Gemini, Gemini CLI, Claude Code - since I was still getting familiar, and had no idea which tool was the right fit for this task.

I will be honest. I was surprised.

Sure, initially I got stuck with a couple of tries and free models suck. But between Gemini Pro and Claude Code, I was able to the following:
- Started with core infrastructure - Set up basic project structure and fundamental app architecture
- Built book management - Added sorting, deletion, and core library features
- Built the reader engine - Implemented pagination, chapter
navigation, and table of contents.
- Added customization - Created reader settings for personalized reading experience (fonts, spacing, etc.)
- Other features like a Settings UI, Book Collections system, Book Search capabilites, basic TTS fuctionality

All this took 2 weekends.

Over the course of next 6-8 weeks, I would add more features and refine further aspects to get to a stage where I was able to able to release on testflight by Aug 2025.

### Not All Rainbows And Sunshine..

There were challenges.

Apart from the usual AI issues like hallucinations, yes-man behaviours and just plain wrong outputs - It's my understanding that a lot of these LLM tools, ranging from Gemini to Claude, are all trained one massive amounts of Python and Javascript/Typescript - but not so much so when it comes to Swift.

Another issue that devs also might take for granted are things like version control (e.g., git), coding practices and tests. A complete beginner / non-developer, may make a lot of blunders when it comes to not having safety checks around this. 

I am lucky to have been exposed to some of this, in the past. You still need a more fundamental understanding of how code works and how to work with these tools when, not if, they make mistakes. But that's for another time.

Yes - the app is not perfect, there are still bugs and edge cases I likely haven't considered. 

But it's mine.

### Conclusion - To Be Continued

In the next part of this, I plan to delve deeper into how I got this, what I learned and what this might mean for the developer world as a whole, in my humble opinion.

---

### Lyrate, an eBook Reader

[gallery]
![Splash Screen](https://res.cloudinary.com/dqxww3j08/image/upload/v1755172808/blog-ios-development-journey-splash-screen_kldebx.png)
![Library](https://res.cloudinary.com/dqxww3j08/image/upload/v1755172846/blog-ios-development-journey-library_koeqsb.png)
![Reader](https://res.cloudinary.com/dqxww3j08/image/upload/v1755172786/blog-ios-development-journey-reader_x8tqbg.png)
[/gallery]