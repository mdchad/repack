const React = require('react');
const htmlToReact = require('html-to-react-dom');
const FigmaAPI = require('figma-js');

const accessToken = 'figd_XKcU1lvyPMBeeOJyDGfHFp5vYPGAIVYbySsfVoC_';
const fileId = 'nK9oIZX2f2F5tV0I3DYWiD';
const client = FigmaAPI({ personalAccessToken: accessToken });

async function importUI() {
  // Convert the React UI into a React component using html-to-react-dom
  const reactComponent = htmlToReact('<div>Hello, Figma!</div>');

  // Create a new frame in the Figma file and add the React component as a node
  const frame = await client.createFrame({
    fileId,
    name: 'My UI',
    node: reactComponent,
  });

  // Set the position and size of the node within the frame
  await client.setNodeTransform({
    fileId,
    nodeId: frame.nodeId,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  // Create a new page in the Figma file and add the frame as a top-level element
  await client.createPage({
    fileId,
    name: 'My Page',
    parent: frame.id,
  });
}

importUI();
