# Email Record

I have an extremely busy week ahead, so probably won't have any additional time. So, let me write down a number of things down now, and then I will most likely be unresponsive for a while.

About Slack and GitHub, you will get an invite to our Slack instance and write access to a GitHub repo dedicated to your thesis, after we have agreed on going forward with the thesis.

About the examination office, yes, please get their official confirmation. After that, we can do the formal registration anytime you want. Be aware that once I submit the registration form to the examination office, the clock is ticking. So, from that point on you have 12 or 14 weeks or whatever your Prüfungsordnung says. That also means that the step of sending in the registration form should be well considered. It is reasonable to first start preparatory work a bit, get to know more of the foundations for the thesis, maybe even start developing a very early prototype, and only then take the step of officially registering the thesis. Many students ask for it to be done that way, and I am okay with that. It gives the students some more security that when the clock finally starts ticking, they already have a good idea of what they have to achieve and how to go about it. On the other hand, there are also students who want to register as quickly as possible and then work against the ticking clock from day one. I don't really mind either way. I leave it up to the students.

About your topic summary and questions:

I need to figure a proper way to download and anylsis the libs from hackage.haskell.org
Yes. This could take several forms. Indeed, you could write a kind of web scraper that really goes through the Hackage pages, for example https://hackage.haskell.org/package/openai-servant-0.3.0.1, and extracts information from there. Or, you could build the relevant documentation locally. That would mean to download the package source code, like https://hackage.haskell.org/package/openai-servant-0.3.0.1/openai-servant-0.3.0.1.tar.gz, and then use the haddock tool (https://haskell-haddock.readthedocs.io/en/latest/) and then build the documentation files locally. That tool is also used for generating the documentation web pages for each Hackage package, so you would get the same data, but with more control, locally on your client machine, without need to scrape web pages. There are certainly pros and cons for either approach. Also different technical challenges for both approaches. In any case, whatever method is chosen, it should be configurable to some extent. Both in terms of selection of packages etc., but probably also in terms of source to use. Specifically, besides Hackage, there is also Stackage (https://www.stackage.org/), which represents in a certain sense curated package subsets. It might be worthwhile to go via Stackage rather than Hackage, or use both in combination, to get better quality data. So the "lib data importing" should be versatile, and there are some engineering challenges. Maybe you should even develop different approaches and then evaluate and compare them in the thesis, to justify which one is ultimately used. (The same can apply to other engineering parts of the overall project.)

I need to develope a way to generate signatures(from my understanding mainly about the functions, so the parameters and the output type info) from the lib
Yes. From the output of Haddock, this information should be extractable in a fairly structured way. That is, just getting the raw information about parameters and outputs per function. But then also comes the question of whether there is a reasonable set of functions in the current package to really lend itself for interesting nested term construction. As a very trivial example, if a package just contains some constants (maybe it is a package of color names, "red :: Color", "blue :: Color", "green :: Color", ...), then that package is not of interest and should be discarded.

I need to filter this libs/signature to present some 'interesting' signatures that would fit for the lecture.
Yes, that’s what's partly already mentioned above. Some criteria and heuristics will have to be developed for that. Maybe it is also worth considering whether the developed tool should be interactive, or at least have some interactive component. In the sense that maybe first a batch job downloads and processes many packages, does some filtering and creates candidates for interesting signatures via some heuristics, but then also lets a user (lecturer) go through the extracted data and accept or reject candidates. Or maybe interactively set additional parameters, saying "Oh, let me look at all candidates with at most six functions in them", or "I want the ratio of real functions to plain constants to be at least 3 : 1", or similar aspects.

Maybe for the later part, include some errors in it and generate the exercise tasks
That's not really something you have to do. The implementation in https://github.com/fmidue/term-tasks already does this. There are facilities in there that can be given a signature and then automatically generate valid and invalid terms, both of which can then be combined for exercise tasks (that are also already able to be imported into our e-learning system). However, maybe there is also room in your thesis for at least a bit of work in this direction. Namely, the term-tasks system takes some parameters, along with a signature, to determine which errors it should introduce into the invalid terms for an exercise task (such as "remove a parameter from a function", "deliberately switch two parameters", etc.). Currently, such "error hints" are given by the lecturer on each use. But maybe it is the case that for some signatures extracted from Hackage package A other error cases make sense than for signatures extracted from Hackage package B. And maybe this depends on some structural aspects of packages A and B. So, if your tool detects such structural aspects, then it is conceivable that you do not only create the signatures but also proposed "error causes" for the subsequent exercise generation (but that exercise generation itself is still handled by the existing term-tasks tool, not your own work). We will see in due time whether it makes sense to go into this direction.

Can I have an example about how the output of the signatures from a lib should like?
I don't really have a fully cooked example at hand, but to give a rough idea, you could consider that a small subset of function signatures to extract from the library https://hackage.haskell.org/package/codeworld-api-0.6.0 might be:

Symbol {symbol = "circle", arguments = [Type {name = "Float"}], result = Type {name = "Picture"}}

Symbol {symbol = "rectangle", arguments = [Type {name = "Float"},Type {name = "Float"}], result = Type {name = "Picture"}}

Symbol {symbol = "print", arguments = [Type {name = "String"}], result = Type {name = "Picture"}}

Symbol {symbol = "scale", arguments = [Type {name = "Picture"},Type {name = "Float"},Type {name = "Float"}], result = Type {name = "Picture"}}

Symbol {symbol = "color", arguments = [Type {name = "Picture"},Type {name = "Color"}], result = Type {name = "Picture"}}

Symbol {symbol = "rotate", arguments = [Type {name = "Picture"},Type {name = "Float"}], result = Type {name = "Picture"}}

Symbol {symbol = "move", arguments = [Type {name = "Picture"},Type {name = "Float"},Type {name = "Float"}], result = Type {name = "Picture"}}

Symbol {symbol = "red", arguments = [], result = Type {name = "Color"}}

Symbol {symbol = "blue", arguments = [], result = Type {name = "Color"}}

Symbol {symbol = "green", arguments = [], result = Type {name = "Color"}}

Maybe along with some separately generated default constants for the Float and String types.

Also, the above names are probably not exactly the ones that you would find in the codeworld-api package linked to above, since they actually come from a related example for another version of that library, but I hope the above lines at least convey the general ideas.

There are also various complications, due to intricacies of the Haskell type system, that are not present in the above example. For example, to deal with certain polymorphism features that will likely be encountered in many existing libraries but which the term-task tool cannot really work with. There are some reasonable strategies that can be applied in these situations, but let us cross that bridge when it is time.

If my understanding about the target is correct, my 'plan' for this task will be: ...
Yes, very roughly, that plan looks about reasonable, except that the 4. point shouldn't really be part of your work (as already explained above), and that actually the project will be much more fine-grained. That is, each of the points 1.-3. really consists of several subpoints, each with their own aspects to weigh, approaches to compare and decide about etc. To a certain extent really because it is not possible to firmly decide up front what an "interesting signature" is. I could tell you based on hand-crafted examples, but for the extracted-from-wild-occurrences examples it is really a matter to still find out. So, there will have to be quite a bit back and forth.

That is also the reason why the Agile Software Development approach will be important. So, the idea definitely is not that you now go away and do this:

I think I can finish the implementation all by my self, I can try to work as independtly as possible, just need to be clear about the task targets, which I am not so familiar with.
Yes, of course, it is great if you can work independently. On the plain implementation front, I am also much in favour of that. But precisely because it is not easy to "be clear about the task targets" up front, because software requirements always change, and much more so in a more exploratory research project as this one here, it won't be possible (or useful!) to define a fixed set of targets now and then evaluate some final blackbox implementation that you deliver in three months against these fixed targets. Instead, you will first have to do the first subpart of the first of your planned points (in a short "sprint", in agile parlance), and then you will present to me what the outputs of your first phase for a few example packages are. Then I will comment on that, maybe adapt the requirements because only after seeing your first outputs it becomes clear that some additional aspects need to be taken into account. That will probably lead to some adaptations, and also inform the implementation of the next subpart of point 1., in the next short implementation sprint, etc., etc.

So, do really try to embrace the Agile SD principles here, and if need be, read more about them first.

And, of course, besides the implementation work, the writing of the actual thesis must not be neglected. In it, you will have to lay out the conceptual developments, design choices and made decisions, descriptions of algorithms used, discussions of results both qualitatively and quantitatively, possibly certain empirical evaluations, etc.


-----Ursprüngliche Nachricht-----
Von: Haodong Ju <haodong.ju@stud.uni-due.de>
Gesendet: Sonntag, 8. Oktober 2023 12:06
An: Janis Voigtländer <janis.voigtlaender@uni-due.de>
Betreff: Re: AW: AW: AW: AW: Inquiry Regarding Bachelor Thesis Topic - Generation of Exercise Tasks on Haskell-to-Prolog Translation


Sorry for the late repley, I think these 'hint' before we start is very fair. I think saying these before is always better than say it after some bad thing happens.

I have read the document https://fmidue.github.io/ba-ma-template/ and prepared the slack, github, and ready to start. I have send emails to examination office, but no reply yet, I am going to contact them and assure that the thesis is ok to start, I will contact you when I got any news.

About the thesis topic: I have some general idea about how to implement it. and also have some question about this topic.

I will firstly describe my understanding for our target here:

1. I need to figure a proper way to download and anylsis the libs from hackage.haskell.org 2. I need to develope a way to generate signatures(from my understanding mainly about the functions, so the parameters and the output type info) from the lib 3. I need to filter this libs/signature to present some 'interesting'
   signatures that would fit for the lecture.
4. Maybe for the later part, include some errors in it and generate the exercise tasks.

I am not sure if I understand the task correctlly, please tell me if I have some missunderstanding. There are some specific questions also.

1. Can I have an example about how the output of the signatures from a lib should like?

If anything is ok, how should we start? If my understanding about the target is correct, my 'plan' for this task will be:

1. Mining and download some libs randomly from the hackage.haskell.org.
2. Write a processer to analysis the code and to generate the signature for the whole lib and all internal functions, see how they works.
3. Think(maybe learn with some material) and discuss with you what is a 'interesting' signature and write a filter to present the needed signatures.
4. Write the task generator for actual usage for these signatures.

I think I can finish the implementation all by my self, I can try to work as independtly as possible, just need to be clear about the task targets, which I am not so familiar with.
