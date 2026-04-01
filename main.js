function generateSidebar() {
    if (!document.body || document.querySelector('.sidebar')) {
        return;
    }

    const sidebarHTML = `
        <div class="sidebar">
            <a class="logo" href="/" title="Benjamin's Notes Homepage">Benjamin Chung</a>
            <a href="/pages/about" class="light" title="About">About</a>
            <a href="/pages/archives" class="light" title="Archives">Writings</a>
            <!-- <a href="./pages/favourites.html" class="light" title="Archives">Favourites</a> -->
            <a href="/pages/experiences" class="light" title="Experiences">Experience</a>
            <a href="/pages/photos" class="light" title="Gallery">Photos</a>
            <br>
            <!--<a href="./pages/projects.html" class="light" title="Projects">Projects</a>-->
            <!-- <a href="./pages/contact.html" class="light" title="Contact">Contact</a>  -->
            <a href="https://www.linkedin.com/in/benjaminrchung/" target="_blank" rel="noopener noreferrer" class="light" title="LinkedIn">LinkedIn</a>
            <a href="https://github.com/BenjaminRChung" target="_blank" rel="noopener noreferrer" class="light" title="GitHub">GitHub</a>
            <a href="https://twitter.com/benjaminrchung" target="_blank" rel="noopener noreferrer" class="light" title="Twitter">Twitter</a>
            <a href="https://substack.com/@benjaminrchung" target="_blank" rel="noopener noreferrer" class="light" title="Substack">Substack</a>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
}

document.addEventListener('DOMContentLoaded', generateSidebar);
