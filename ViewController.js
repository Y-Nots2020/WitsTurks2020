$(document).ready(() => { //this is called when the web page finishes loading all content
	//what we wanna do is display the default page which will be the profile page
	//first thing we need is create references to our <li> tags
	
	let profile = $("#profile"); //finds tag by its tag
	let projects = $("#viewProjects");
	let completedProjects = $("#completedProject");
	let createProjects = $("#createProjects");

	//we also need to create references to the divs
	//because we need to know what we want to display and not to display
	let profileDiv = $("#profileDiv");
	let projectsDiv = $("#projectsDiv");
	let completedProjectsDiv = $("#completedProjectsDiv");
	let createProjectsDiv = $("#createProjectsDiv");

	
	//we now need to set onClickListeners for the <li> (profile, projects, completedProjects)
	//also gonna create a function that sets all the divs to be invincible
	profile.on("click", () => {
		setAllDivsToBeInvincible();//set all divs to invincible
		profileDiv.css("display", "flex");
	});
	
	projects.on("click", () => {
		setAllDivsToBeInvincible();
		projectsDiv.css("display", "flex");
	});
	
	completedProjects.on("click", () => {
		setAllDivsToBeInvincible();
		completedProjectsDiv.css("display", "flex");
	});

	createProjects.on("click", () => {
		setAllDivsToBeInvincible();
		createProjectsDiv.css("display", "flex");
	});

	//lastly we want the profile page to display by default
	profileDiv.css("display", "flex");
	
	function setAllDivsToBeInvincible(){
		//since we don't have a lot divs, we can just manually set all divs to none
		profileDiv.css("display", "none");
		projectsDiv.css("display", "none");
		completedProjectsDiv.css("display", "none");
		createProjectsDiv.css("display", "none");
	}
	
});