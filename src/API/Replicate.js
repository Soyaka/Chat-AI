import Replicate from "replicate";

const replicate = new Replicate({
  auth: "r8_EcKmfOHTmtfXheyPxa5r89fu3Lnj3mN41VFol",
  origin  : 'https://api.replicate.com'
});

 export async function ImageGenerator(prompt){
    const output = await replicate.run(
        "ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
        {
          input: {
            width: 1024,
            height: 1024,
            prompt: prompt,
            num_outputs: 1,
            num_inference_steps: 75,
            num_inference_steps_prior: 25
          }
        }
      );
      console.log(output);
      return output;

 }
