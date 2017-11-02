import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 2;
		this.resumeEditorContent = `
# jiachen(steve) guo


## Work experience:

### MangoTech Group: Front-end developer

* Designed and implemented a custom CSS grid system with CSS media queries for mobile responsiveness without using Bootstrap
* React components and router building and deploying, Redux state managment
* Programmed HTML5 canvases to animate particles on web backgrounds for site-wide promotions
*	Tested front-end code in multiple browsers to ensure cross-browser compatibility


### Rayking information technology: web developer

* Corporate with UI designer, Translate designs to front-end code using latest HTML5 and CSS3, backed by Bootstrap and Jquery
* Company landing page building. Developed maintainable, scalable, responsive, and cross-browser web application suitable for all kinds of devices.
* task tools gulp, webpack used ensure development automation and organization
* Estimate time and costs, and help team leader and clients to determine developer requirements and specifications.




## Education

1. **University of Mebourne - Information Technology**    Master
	* High Distint Graduate

2. **Beijing University of Post and Telecommunication - Information System**   Bachelor
	* 4th Year (Honours) Student, 4.30 GPA (5-point scale)



## Projects

### Travel Agency official website development

*	Brief intro: Designed and developed a travel agency website corporate with UI/UX designer. Website layout and function design, using both vanilla JavaScript and jQuery upgrade legacy static website to a dynamic and responsive cross-browser website. Corporate with back-end developer set JSON format and API uses.
*	Role taken: Front-end developer, system tester, team member
*	Key word:  front-end development, API integration, system testing
*	Skill Developed: Quick Problem Solving, Critical Observation and System Optimization

### Modeling interacting epidemics on network
*	Brief intro: Designed and developed a SIR Model agent-based simulation model to investigate the outbreak pattern of disease. Pattern analyzing and trend prediction backed by mathematical and statistical knowledge. Using Repast Simphony as the platform. The Programming language is Java. 
*	Role taken: Architecture Designer, System Analyst, Software Developer, System Tester
*	Key word: Java Application, complex system modeling, SIR model, Repast 



**GitHub: **https://github.com/stevejiachen
**Animation Resume: https://stevejiachen.github.io/react-resume/**

> If you like you could fork me with my github(https://github.com/stevejiachen/react-resume)`;

		this.styleEditorContent = [`/*
* Inspired by http://strml.net/
*
* Hello, I'm steve
*
* this is a dynamic resume using react
* hope you like
*/

/* Let's begin, first add some transition */
* {
  -webkit-transition: all 1s;
  transition: all 1s;
}
/* white background too boring, let's have some change */
html {
  color: rgb(222,222,222); background: #425261;
}
/* page is so bold, let's add some decoration~ */
.styleEditor {
  position: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* then some color */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* some 3d effect */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}


/* then a resume editor for my own resume */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}

/* Here we go */
`,
`
/*
 * This is Markdown format，Let's translate to HTML
`,
`
/* Some Styles */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
/*
* I hope you enjoyed this.
*/
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceStyleEditorContent() {

	}

	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		});
	}

	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
		console.log(111);
		// this.refs.StyleEditor.replaceContent(this.content[0]);
		// this.replaceStyle(this.content[0]);
		// this.refs.ResumeEditor.replaceContent("");
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));
