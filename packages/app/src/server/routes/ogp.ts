import {
  Request, Response,
} from 'express';

import axios from '~/utils/axios';

export const renderOgp = async(req: Request, res: Response): Promise<Response | void> => {

  if (req.params.pageId === '') {
    return res.status(400).send();
  }

  const ogpUri: string = process.env.OGP_URI || '';
  if (ogpUri === '') {
    return res.status(400).send('OGP URI for GROWI has not been setup');
  }

  let result;
  try {
    result = await axios({
      url: ogpUri,
      method: 'GET',
      responseType: 'arraybuffer',
      // TODO: Make it possible to display the GROWI APP name and page title
      params: {
        title: '20210803_ OpenWikiのOGPを表示できるようにする',
        brand: 'GROWI Developers Wiki',
      },
    });
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).send();
  }

  const imageBuffer = Buffer.from(result.data, 'binary');

  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': imageBuffer.length,
  });

  res.end(imageBuffer);
};
