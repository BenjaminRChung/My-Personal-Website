// window.addEventListener('DOMContentLoaded', (event) => {
//     const toggleButton = document.createElement('button');
//     toggleButton.id = 'theme-toggle';
//     toggleButton.innerText = 'Toggle theme';
//     toggleButton.addEventListener('click', function() {
//         document.body.classList.toggle('dark-mode');
//     });

//     document.body.appendChild(toggleButton);
// });

function generateSidebar() {
    const sidebarHTML = `
        <div class="sidebar">
            <a class="logo" href="../" title="Benjamin's Notes Homepage">Benjamin Chung</a>
            <a href="../pages/about" class="light" title="About">About</a>
            <a href="../pages/archives" class="light" title="Archives">Writings</a>
            <!-- <a href="./pages/favourites.html" class="light" title="Archives">Favourites</a> -->
            <a href="../pages/experiences" class="light" title="Experiences">Experience</a>
            <!-- <a href="../pages/photos.html" class="light" title="Gallery">Photos</a> -->
            <br>
            <!--<a href="./pages/projects.html" class="light" title="Projects">Projects</a>-->
            <!-- <a href="./pages/contact.html" class="light" title="Contact">Contact</a>  -->
            <a href="https://www.linkedin.com/in/benjaminrchung/" target="_blank" class="light" title="LinkedIn">LinkedIn</a>
            <!-- <a href="https://benjamin-chung.medium.com/" target="_blank" class="light" title="Medium">Medium</a> -->
            <a href="https://github.com/BenjaminRChung" target="_blank" class="light" title="GitHub">GitHub</a>
            <!--<a href="https://twitter.com/benjaminrchung" target="_blank" class="light" title="Twitter">Twitter</a>-->
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
}

window.onload = generateSidebar;