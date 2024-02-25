const cleanPrompt = (input) => {
  const op = input.match(/Option \d+: .+/g);
  const optionsWithoutPrefix = op.map((option) =>
    option.replace(/^Option \d+: /, "")
  );
  let linesArray = input.split("\n\n");
  // linesArray = input.split('\n');
  const story = [];
  const options = [];
  const ret = [];

  linesArray.map((entry) => {
    if (entry.split(" ")[0] === "Option") options.push(entry);
    else story.push(entry);
  });

  ret.push(story);
  ret.push(options);

  return { prompt: ret[0], options: optionsWithoutPrefix };
};

module.exports = {
  cleanPrompt,
};
