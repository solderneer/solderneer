
## Introduction
1. The technology hype cycle. (?)
2. The transformative potential of AI and the rapid mass adoption of tools like ChatGPT explain why it is important to think about AI architecture and problems.
3. Sam Altman's _"Moore's Law for everything"_
4. Gary calls for pause, claiming that "Deep Learning is hitting a wall", that it is not making meaningful progress. 
	1. He cites three key problems with deep learning AI, verifiability/reasoning (how human explainable), unreliability (factual grounding), safety and bias which all forms the basis of what he defines as genuine comprehension.

## Interpretability (His arguments)

>When a single error can cost a life, it’s just not good enough.

>Not long ago, for example, a Tesla in so-called “Full Self Driving Mode” encountered a person holding up a stop sign in the middle of a road. The car failed to recognize the person (partly obscured by the stop sign) and the stop sign (out of its usual context on the side of a road); the human driver had to take over. The scene was far enough outside of the training database that the system had no idea what to do.

[Artificial Intelligence inscrutiable on overfitting](https://nautil.us/is-artificial-intelligence-permanently-inscrutable-236088/)
>instructed doctors to send home pneumonia patients who already had asthma, because patients were always admitted to ICU and so developed very few complications. Artificial hosptial policy influencing learning

>“What machines are picking up on are not facts about the world,” Batra says. “They’re facts about the dataset.” That the machines are so tightly tuned to the data they are fed makes it difficult to extract general rules about how they work. More importantly, he cautions, if you don’t know how it works, you don’t know how it will fail.
>

## Reasoning (His Arguments)

>procedural reasoning when it accomplishes multi-step tasks that involve program-like abstraction mechanisms such as looping, functional abstractions, and symbolic data structures.

He cites himself running experiments [here](https://www.technologyreview.com/2020/08/22/1007539/gpt3-openai-language-generator-artificial-intelligence-ai-opinion/)

>When Ernie Davis, a computer scientist at New York University, and I took a deeper look, we found the same hallmarks of unreliability.

And he calls GPT-3, "fluent spouter of bullshit", notably criticising it's inability to reliably deliver truth. He however, entirely dismisses the point on prompt engineering, saying that _"The trouble is that you have no way of knowing in advance which formulations will or won’t give you the right answer."_

## Safety (His Arguments)

Here he also referrs to [Google Deepmind's article on LLM risks](https://arxiv.org/pdf/2112.04359.pdf) saying they hold no compelling solutions. And also stochastic parrots. And RLHF techniques that are used to remedy these don't feel particularly compelling. (https://openai.com/research/learning-from-human-preferences)

## Verifiability and Reasoning (Counter arguments)

[Interpretability is hard to quality](https://arxiv.org/pdf/1606.03490.pdf)
>In some cases, transparency may be at odds with the broader objectives of AI (tradeoff for accuracy)
>Post-hoc interpretations can potentially mislead (train pathological behaviour at scale)


## Unreliability and hallucinations (Counter Arguments)
Do note however, that GPT-4 can correct itself when prompted. And does especially well when inserted into an OODA loop with additional tools like search and wikipedia integrated into it. Langchain shows this. So does [Do large language models understand us](https://medium.com/@blaisea/do-large-language-models-understand-us-6f881d6d8e75). 

 >For language models, time as such doesn’t really exist; only conversational turns in strict alternation, like moves in a game of chess. Within a conversational turn, letters or words are emitted sequentially with each “turn of the crank”. In this quite literal sense, today’s language models are made to say the first thing that comes to mind.

>Longer arcs, however, would require critique, inner dialog, deliberation, and iteration, just as they do for us. An unfiltered “stream of consciousness” utterance isn’t enough; extended reasoning and storytelling necessarily unfold in time. They involve development and refinement over what amount to many conversational turns.

>As anticlimactic as it sounds, complex sequence learning may be the key that unlocks all the rest. This would explain the surprising capacities we see in large language models — which, in the end, are nothing but complex sequence learners.


## Safety and toxicity

Here he also referrs to [Google Deepmind's article on LLM risks](https://arxiv.org/pdf/2112.04359.pdf) saying they hold no compelling solutions. In fact they did outline potential risk mitigation solutions but echoed earlier theme on the taking a broad based approach across socio-technical risk factors.

>Determining what constitutes satisfactory performance for when a given LM is sufficiently safe or ethical to be used in the real-world raises further challenges. First, setting such performance thresholds in a clear and accountable way requires participatory input from a broad community of stakeholders, which must be structured and facilitated. Second, views on what level of performance is needed are likely to diverge - for example, people hold different views of what constitutes unacceptable “toxic speech”








## Scaling and Measures
* While empirical scaling laws show promise for coherency, here lies the issue for metrics looking for genuine comprehension. 
* Even within the source itself, it is pointed out that there is no theoretical underpinning of the scaling law and therefore it is likely unreliable in nature. https://arxiv.org/abs/2001.08361
* And there are really no standardized metrics to measure this, every paper uses different metrics.
* [reference](https://arxiv.org/pdf/2112.11446.pdf) and [reference](https://arxiv.org/abs/2201.08239) and [reference](https://arxiv.org/pdf/2112.04359.pdf)
* Lately GPT-4 was benchmarked on highly human metrics showing really good results, calling it out on metrics for understanding would be quite ironic

## Symbolic vs Connectionist
* Goes on to talk to the sociological history between the symbolic AI and the connectionist AI arguments.
* Explain symbolic and connectionist AI
* Type 1 and Type 2 systems, Daniel Kahneman
## Use of hybrid models
* Examples of games such as Go chess and so forth.
* Also pointing out the reasoning, and reliability of symbolic systems as a pro to advocate for hybrid models
* Also enables composability and transfer learning.
* Shows issues with scalability and specification.
* This can't be that relevant for open world general intelligence
* Type 1 systems preceeded type 2 intelligence

## Sooner than expected
* Compelling evidence in 
* 
* Thought vectors encoding understanding - in language translation models
* With the ChatGPT plugin API, the merger between symbolic and neural AI might be faster and is an entirely unexpected way.
* The unexpected sufficiency of LLMs is still very surprising
* Second order looping LLMs invoking predictable utilities might really be the way forward
* Complex sequence learning might be the key to unlocking everything else








# [Source Article](https://nautil.us/deep-learning-is-hitting-a-wall-238440/)

* Immediately Gary's key point revolves around the idea of formal verification, and safety. He said: "when a single error can cost a life it is simply not good enough"
* To be fair humans also have the same issue, in [Is artificial intelligence inscrutiable](https://nautil.us/is-artificial-intelligence-permanently-inscrutable-236088/) it is said
>To Cynthia Rudin, professor of computer science and electrical and computer engineering at Duke University, these “post-hoc” interpretations are by nature problematic. Her research focuses on building rule-based machine learning systems applied to domains like prison sentencing and medical diagnosis, where human-readable interpretations are possible—and critically important. But for problems in areas like vision, she says, “Interpretations are completely within the eye of the beholder.”

* ~He also seems to think that the hype cycle is unique to AI, hint, it's not. It does definitely have adverse effects on science funding and hype funding~

* Again on unreliability and hallucination:
> When Ernie Davis, a computer scientist at New York University, and I took a deeper look, we found the same hallmarks of unreliability.

Do note however, that GPT-4 can correct itself when prompted. And does especially well when inserted into an OODA loop with additional tools like search and wikipedia integrated into it. Langchain shows this. So does [Do large language models understand us](https://medium.com/@blaisea/do-large-language-models-understand-us-6f881d6d8e75). 

* Stochastic parrots and toxic output
How fair is to when it's hard for humans to be aligned. We can also discuss RLHF and associated techniques, notably how Scott Alexander criticises AI companies for being unable to control their AIs.

* Measures
>the measures that have scaled have not captured what we desperately need to improve: genuine comprehension.

>that scaling starts to falter on some measures, such as toxicity, truthfulness, reasoning, and common sense.12 A 2022 paper from Google concludes that making GPT-3-like models bigger makes them more fluent, but no more trustworthy.

This comes back to the question on measures. It does still increase significantly on some other measures. Not to mention, comparatively symbolic systems has had no such advancements in many years.

* The nethack challenge as an example of a time where symbolic AIs won out. It's worth point out that games are one aspect where you could expect symbolic AI to work better. It's much more constrained than the African Savannah.
>some of the best-known recent successes in board-game playing (Go, Chess, and so forth, led primarily by work at Alphabet’s DeepMind) are hybrids.

Symbolic Systems:
* the argument against is essentially around thought vectors and how they are in essence symbols, and in fact they are learnt symbols, because deep learning is a form of representation learning.

IDEA:
second order looping AI, self-talk can potentially be intermediate symbols. maybe langchain and looping AIs is an approach to a merger between symbolic and connectionist approaches.

thought vectors are a good justification there in language translation models

Pretraining through evolution, and 10s of billions of years. The data problem is not entirely unacceptable.

how huge chatGPT adoption has actually been in relation to other major software tools. Moving goalposts problem.




# ["Deep Learning can do everything"](https://www.technologyreview.com/2020/11/03/1011616/ai-godfather-geoffrey-hinton-deep-learning-will-do-everything/)
* 
* Hinton is making a pretty big claim here, and completely trashing symbolic systems research

> The symbol people thought we manipulated symbols because we also represent things in symbols, and that’s a representation we understand. I think that’s equally wrong. What’s inside the brain is these big vectors of neural activity.

# [Do large language models understand us](https://medium.com/@blaisea/do-large-language-models-understand-us-6f881d6d8e75)

> For language models, time as such doesn’t really exist; only conversational turns in strict alternation, like moves in a game of chess. Within a conversational turn, letters or words are emitted sequentially with each “turn of the crank”. In this quite literal sense, today’s language models are made to say the first thing that comes to mind.

>Longer arcs, however, would require critique, inner dialog, deliberation, and iteration, just as they do for us. An unfiltered “stream of consciousness” utterance isn’t enough; extended reasoning and storytelling necessarily unfold in time. They involve development and refinement over what amount to many conversational turns.

>As anticlimactic as it sounds, complex sequence learning may be the key that unlocks all the rest. This would explain the surprising capacities we see in large language models — which, in the end, are nothing but complex sequence learners.