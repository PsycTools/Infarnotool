/**
 * IMAGE SERVICES (HuggingFace & RemoveBG)
 * 
 * NOTE FOR DEPLOYMENT:
 * To avoid exposing keys and CORS errors, these functions should point to your backend:
 * const response = await fetch('/api/remove-bg', ...)
 * 
 * For this PREVIEW environment, we are using the keys client-side.
 */

const KEYS = {
    REMOVE_BG: 'ebiePM6Q4LBqtwvbRNAHveTp',
    HF: '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' 
};

export const removeBackground = async (imageFile: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': KEYS.REMOVE_BG
            },
            body: formData
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.errors?.[0]?.title || 'RemoveBG Failed');
        }

        return await response.blob();
    } catch (error) {
        console.error("RemoveBG Error:", error);
        throw new Error("Failed to summon RemoveBG demon. Likely CORS issue in browser. Use Backend Proxy.");
    }
};

export const generateAnimeImage = async (prompt: string): Promise<Blob> => {
    // Model: Stable Diffusion Anime or similar available on HF Inference API
    const MODEL = "cagliostrolab/animagine-xl-3.1"; // Example High Quality Anime Model
    // Fallback if that one is down: "hakurei/waifu-diffusion"
    
    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${MODEL}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${KEYS.HF}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: prompt + ", masterpiece, best quality, anime style, highly detailed" }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HF Error: ${response.status} ${response.statusText}`);
        }

        return await response.blob();
    } catch (error) {
        console.error("HF Gen Error:", error);
        throw error;
    }
};