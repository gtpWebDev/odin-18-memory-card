const fxhashApiAddress = "https://api.v2-temp.fxhash.xyz/graphql";

const projectImageArray = [
  2, 20000, 16111, 79, 10363, 14, 15924, 2193, 15377, 86, 11104, 2613, 16217,
  65, 20891, 11517, 18601, 8564, 21483, 24169, 21602, 13131, 7889, 23549, 13484,
  22246, 12693, 16146, 17146, 15053, 1726, 3683, 17605, 14017, 12922, 19456,
  1291, 16102, 5345, 13449, 9504, 15218, 3177, 27175, 14392, 13497, 2968, 19352,
  14048, 2332, 1600, 21450, 20002, 4060, 4231, 21727,
];

async function getFxhashProjectData(numberOfProjects) {
  let collectedProjects = [];
  let projectInfoArray = [];

  for (let i = 0; i < numberOfProjects; i++) {
    let newProjectId = selectNewFxhashProject(collectedProjects);
    collectedProjects.push(newProjectId);

    const apiResponse = await fxhashApi_projectInfo(newProjectId);

    if (apiResponse.success) {
      const data = apiResponse.data;
      const project = {
        id: i,
        rand: Math.random(),
        imgUrl: data.thumbnailUrl,
        text: data.projectName + " by " + data.artistName,
        selected: false,
      };
      projectInfoArray.push(project);
    } else {
      throw "Error collecting Fxhash data";
    }
  }
  return projectInfoArray;
}

function selectNewFxhashProject(collectedProjects) {
  // collect a project id which isn't already contained in collectedProjects
  let totalImages = projectImageArray.length;

  let chosenProject;
  do {
    const randomNum = Math.floor(Math.random() * totalImages);
    chosenProject = projectImageArray[randomNum];
  } while (collectedProjects.includes(chosenProject));

  return chosenProject;
}

async function fxhashApi_projectInfo(projectId) {
  // Collects various details for a specific Fxhash project, identified by the "fx_issuer_id" = fxhash project id

  try {
    let rawResponse = await fetch(fxhashApiAddress, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          generativeToken(id: "${projectId}") {
            author {
              name
            }
            name
            thumbnailUri
          }
        }
    
        `,
      }),
    });
    let result = await rawResponse.json();
    let fxhashProjectResult = result.data.generativeToken;

    const artistName = fxhashProjectResult.author.name
      ? fxhashProjectResult.author.name
      : "Anon";
    const thumbnailUrl = `https://gateway.fxhash.xyz/ipfs/${fxhashProjectResult.thumbnailUri.substring(
      7
    )}`;

    const projectName = fxhashProjectResult.name;

    const data = { artistName, projectName, thumbnailUrl };

    return { success: true, data };
  } catch (err) {
    return { success: false };
  }
}

export default getFxhashProjectData;
