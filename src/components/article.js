export const article = {
  title: "Some Title",
  source: "Some Source",
  publishedDateTime: "20191217",
  url: "https://somesource.com",
  text: `
  Google left thousands of machines in businesses with broken Chrome browsers this week, following a silent experimental change. Business users accessing Chrome through virtual machine environments like Citrix kept seeing white screens on open Chrome tabs, blocking access to the browser and leaving it totally unresponsive. It left many IT admins confused over the problem, as businesses typically manage and control Chrome updates.
  After complaints, Google was forced to reveal it had launched an “experiment” on stable versions of Chrome that had changed the browser’s behavior. The experiment was made silently, without IT admins or users being warned about Google’s changes. Google had simply flipped the switch on a flag to enable a new WebContents Occlusion feature that’s designed to suspend Chrome tabs when you move other apps on top of them and reduce resource usage when the browser isn’t in use.
  “The experiment / flag has been on in beta for ~5 months,” explained David Bienvenu, a software engineer at Google, in a Chromium bug thread. “It was turned on for stable (e.g., m77, m78) via an experiment that was pushed to released Chrome Tuesday morning. Prior to that, it had been on for about one percent of M77 and M78 users for a month with no reports of issues, unfortunately.”
  `,
  initialTags: []
};
