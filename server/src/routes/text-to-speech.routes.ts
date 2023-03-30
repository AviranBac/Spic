import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import textToSpeech, { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import SsmlVoiceGender = google.cloud.texttospeech.v1.SsmlVoiceGender;
import ISynthesizeSpeechRequest = google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;
import ISynthesizeSpeechResponse = google.cloud.texttospeech.v1.ISynthesizeSpeechResponse;

const router = express.Router();
const ttsClient: TextToSpeechClient = new textToSpeech.TextToSpeechClient();

router.get('', async (req: Request, res: Response) => {
    const text: string = req.query.text as string;
    const languageCode: string = req.query.languageCode as string;
    const gender: SsmlVoiceGender = req.query.gender as unknown as SsmlVoiceGender;

    const request: ISynthesizeSpeechRequest = {
        input: {text},
        voice: {
            languageCode,
            name: `${languageCode}-Standard-${gender.toString().toUpperCase() === 'FEMALE' ? 'A' : 'B'}`
        },
        audioConfig: {
            audioEncoding: 'MP3'
        }
    };

    try {
        const [ttsResponse]: [ISynthesizeSpeechResponse, any, any] = await ttsClient.synthesizeSpeech(request);
        console.log(`Got Text-to-Speech response for text: ${text} and gender: ${gender}`);

        res.writeHead(StatusCodes.OK, {
            'Content-Type': 'audio/mp3'
        }).end(ttsResponse.audioContent);
    } catch (error) {
        const message = `Failed to fetch Text-to-Speech for text: ${text} and gender: ${gender}`;
        console.error(message, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(message);
    }
});

export default router;