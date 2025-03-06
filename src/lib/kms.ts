import { DecryptCommand, EncryptCommand, KMSClient } from '@aws-sdk/client-kms';

// Initialize the KMS client
const kmsClient = new KMSClient({
	region: process.env.AWS_REGION || 'us-east-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
	},
});

export async function encryptToken(token: string): Promise<string> {
	if (!process.env.AWS_KMS_KEY_ID) {
		throw new Error('AWS_KMS_KEY_ID is not configured');
	}

	const command = new EncryptCommand({
		KeyId: process.env.AWS_KMS_KEY_ID,
		Plaintext: Buffer.from(token),
	});

	try {
		const response = await kmsClient.send(command);
		if (!response.CiphertextBlob) {
			throw new Error('No ciphertext returned from KMS');
		}
		// Convert the encrypted binary data to base64 for storage
		return Buffer.from(response.CiphertextBlob).toString('base64');
	} catch (error) {
		console.error('Error encrypting token:', error);
		throw error;
	}
}

export async function decryptToken(encryptedToken: string) {
	const command = new DecryptCommand({
		CiphertextBlob: Buffer.from(encryptedToken, 'base64'),
	});

	try {
		const response = await kmsClient.send(command);
		if (!response.Plaintext) {
			throw new Error('No plaintext returned from KMS');
		}
		// Convert the decrypted binary data back to a string
		return Buffer.from(response.Plaintext).toString('utf-8');
	} catch (error) {
		console.error('Error decrypting token:', error);
		throw error;
	}
}
