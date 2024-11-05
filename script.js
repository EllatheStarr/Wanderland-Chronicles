
const themeToggle = document.getElementById('theme-toggle');
const newsletterForm = document.getElementById('newsletter-form');
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});


const nav = document.querySelector('.sticky-nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});


let currentSlide = 0;
const totalSlides = slides.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);


let carouselInterval = setInterval(nextSlide, 5000);


carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = '';
    input.classList.remove('error');
}


const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const interestSelect = document.getElementById('interest');

nameInput.addEventListener('input', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter a valid name (letters and spaces only)');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

interestSelect.addEventListener('change', () => {
    if (!interestSelect.value) {
        showError(interestSelect, 'Please select a travel interest');
    } else {
        clearError(interestSelect);
    }
});


newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

   
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter a valid name');
        isValid = false;
    }

    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    
    if (!interestSelect.value) {
        showError(interestSelect, 'Please select a travel interest');
        isValid = false;
    }

    if (isValid) {
     
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            interest: interestSelect.value
        };

        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = '#2ecc71';
        successMessage.style.marginTop = '1rem';
        newsletterForm.appendChild(successMessage);

        
        newsletterForm.reset();

        setTimeout(() => {
            successMessage.remove();
        }, 3000);

        console.log('Form submitted:', formData);
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const galleryItems = document.querySelectorAll('.gallery-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
});


document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const post = button.closest('.post');
        const content = post.querySelector('p:not(.post-meta)');
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            button.textContent = 'Read More';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            button.textContent = 'Read Less';
        }
    });
});

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const post = button.closest('.post');
        const excerpt = post.querySelector('.excerpt');
        const fullContent = post.querySelector('.full-content');
        
        if (fullContent.classList.contains('visible')) {
            
            fullContent.classList.remove('visible');
            excerpt.style.display = 'block';
            button.textContent = 'Read More';
            
            
            post.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          
            fullContent.classList.add('visible');
            excerpt.style.display = 'none';
            button.textContent = 'Read Less';
        }
    });
});