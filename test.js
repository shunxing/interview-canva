const designs = {};

const fetchDesignById = async (id) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          designId: id,
          shapes: [
            {
              shapeId: "basic-shape",
              color: { r: 55, g: 40, b: 255 },
              children: [],
            },
            {
              shapeId: "duck",
              color: { r: 255, g: 255, b: 252 },
              children: [
                {
                  shapeId: "duck-bill",
                  color: { r: 255, g: 255, b: 255 },
                  children: [],
                },
                {
                  shapeId: "duck-body",
                  color: { r: 205, g: 255, b: 252 },
                  children: [],
                },
                {
                  shapeId: "duck-legs",
                  color: { r: 100, g: 255, b: 252 },
                  children: [],
                },
              ],
            },
            {
              shapeId: "zigzag-polygon",
              color: { r: 205, g: 255, b: 252 },
              children: [],
            },
            {
              shapeId: "fish",
              color: { r: 205, g: 255, b: 252 },
              children: [
                {
                  shapeId: "fish-eyes",
                  color: { r: 255, g: 255, b: 255 },
                  children: [],
                },
                {
                  shapeId: "fish-fin",
                  color: { r: 100, g: 66, b: 74 },
                  children: [
                    {
                      shapeId: "fish-fin-part-1",
                      color: { r: 93, g: 54, b: 55 },
                      children: [],
                    },
                    {
                      shapeId: "fish-fin-part-2",
                      color: { r: 33, g: 255, b: 255 },
                      children: [],
                    },
                    {
                      shapeId: "fish-fin-part-3",
                      color: { r: 128, g: 53, b: 255 },
                      children: [],
                    },
                  ],
                },
                {
                  shapeId: "fish-tail",
                  color: { r: 255, g: 5, b: 255 },
                  children: [],
                },
              ],
            },
            {
              shapeId: "duck",
              color: { r: 255, g: 255, b: 252 },
              children: [
                {
                  shapeId: "duck-bill",
                  color: { r: 255, g: 255, b: 255 },
                  children: [],
                },
                {
                  shapeId: "duck-body",
                  color: { r: 205, g: 255, b: 252 },
                  children: [],
                },
                {
                  shapeId: "duck-legs",
                  color: { r: 100, g: 255, b: 252 },
                  children: [],
                },
              ],
            },
          ],
        }),
      Math.random() * 3000 + 1000
    )
  );
};

function calculateAverageColors(data) {
  const result = {};

  function calculate(shape, designId) {
    if (!result[designId]) {
      result[designId] = { count: 0, r: 0, g: 0, b: 0 };
    }

    const { r, g, b } = shape.color;
    result[designId].r += r;
    result[designId].g += g;
    result[designId].b += b;
    result[designId].count += 1;

    for (const child of shape.children) {
      calculate(child, designId);
    }
  }

  for (const shape of data.shapes) {
    calculate(shape, data.designId);
  }

  const averageColors = {};
  for (const designId in result) {
    const { count, r, g, b } = result[designId];
    averageColors[designId] = {
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count),
    };
  }
  return averageColors;
}

const getAverageColor = (shapes) => {
  const averageColor = { r: 0, g: 0, b: 0 };
  const typeOfColor = ["r", "g", "b"];
  shapes.forEach((shape) => {
    typeOfColor.forEach((color) => {
      averageColor[color] += shape.color[color];

      if (shape.children && shape.children.length > 0) {
        const averageColorChildren = getAverageColor(shape.children);
        typeOfColor.forEach((color) => {
          averageColor[color] =
            (averageColor[color] + averageColorChildren[color]) / 2;
        });
      }
    });
  });

  typeOfColor.forEach((color) => {
    averageColor[color] = averageColor[color] / shapes.length;
  });
  return averageColor;
};
const main = async () => {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetchDesignById(i));
  }
  Promise.all(promises).then((designs) => {
    designs.forEach((design) => {
      const averageColor = calculateAverageColors(design);
      console.log(
        `Design: ${design.designId}: ${JSON.stringify(averageColor)}`
      );
    });

    console.log("Done");
  });
};

main();
