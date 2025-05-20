/**
 * Duolingo Magic Carpet Experience
 * Carpet Customizer JavaScript
 */

// State management for carpet customization
let carpetState = {
  pattern: 'geometric',
  color: '#1cb0f6', // Duo blue
  learningStyle: 'visual',
  streakDays: 12,
  gems: 324,
  league: 'silver',
  masteredAreas: [
    {x: 20, y: 20, size: 80},
    {x: 70, y: 60, size: 60},
    {x: 25, y: 75, size: 40}
  ]
};

// DOM Elements
const carpetBase = document.querySelector('.carpet-base');
const carpetOverlay = document.querySelector('.carpet-overlay');
const carpetPreview = document.getElementById('carpet-preview');
const patternOptions = document.querySelectorAll('.pattern-option');
const colorOptions = document.querySelectorAll('.color-option');
const styleOptions = document.querySelectorAll('.style-option');
const downloadButton = document.getElementById('download-carpet');
const shareButton = document.getElementById('share-carpet');

// Initialize the carpet customizer
function initCustomizer() {
  // Set initial carpet state
  updateCarpetPreview();
  
  // Add event listeners to pattern options
  patternOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Get pattern data
      const pattern = option.getAttribute('data-pattern');
      selectPattern(pattern);
    });
  });
  
  // Add event listeners to color options
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Get color data
      const color = option.getAttribute('data-color');
      selectColor(color);
    });
  });
  
  // Add event listeners to style options
  styleOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Get style data
      const style = option.getAttribute('data-style');
      selectLearningStyle(style);
    });
  });
  
  // Add event listener to download button
  if (downloadButton) {
    downloadButton.addEventListener('click', downloadCarpet);
  }
  
  // Add event listener to share button
  if (shareButton) {
    shareButton.addEventListener('click', shareCarpet);
  }
}

// Update carpet visualization based on state
function updateCarpetPreview() {
  // Apply pattern and color
  carpetBase.style.backgroundColor = carpetState.color;
  
  // Set pattern based on selection
  switch(carpetState.pattern) {
    case 'geometric':
      carpetBase.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")";
      break;
    case 'floral':
      carpetBase.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17.5c4.142 0 7.5-3.358 7.5-7.5S14.142 2.5 10 2.5 2.5 5.858 2.5 10s3.358 7.5 7.5 7.5z' fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")";
      break;
    case 'animals':
      carpetBase.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z' fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")";
      break;
    case 'cultural':
      carpetBase.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20L0 10h20L10 0z' fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")";
      break;
  }
  
  // Apply learning style effects
  applyLearningStyleEffects();
  
  // Apply league effects (height/elevation)
  applyLeagueEffects();
  
  // Update stats display
  updateStatsDisplay();
}

// Select pattern
function selectPattern(pattern) {
  // Update the state
  carpetState.pattern = pattern;
  
  // Update UI elements
  patternOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-pattern') === pattern) {
      option.classList.add('active');
    }
  });
  
  // Update the carpet preview
  updateCarpetPreview();
}

// Select color
function selectColor(color) {
  // Update the state
  carpetState.color = color;
  
  // Update UI elements
  colorOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-color') === color) {
      option.classList.add('active');
    }
  });
  
  // Update the carpet preview
  updateCarpetPreview();
}

// Select learning style
function selectLearningStyle(style) {
  // Update the state
  carpetState.learningStyle = style;
  
  // Update UI elements
  styleOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-style') === style) {
      option.classList.add('active');
    }
  });
  
  // Update the carpet preview
  updateCarpetPreview();
}

// Apply learning style effects
function applyLearningStyleEffects() {
  const carpetCharacter = document.querySelector('.carpet-character');
  
  // Reset all style-specific classes
  carpetPreview.classList.remove('style-visual', 'style-auditory', 'style-kinesthetic');
  
  // Apply style-specific effects
  carpetPreview.classList.add(`style-${carpetState.learningStyle}`);
  
  // Style-specific character and effects
  switch(carpetState.learningStyle) {
    case 'visual':
      carpetCharacter.style.backgroundImage = "url('../images/3.png')";
      break;
    case 'auditory':
      carpetCharacter.style.backgroundImage = "url('../images/3.png')";
      // Play audio effect
      playAudioEffect();
      break;
    case 'kinesthetic':
      carpetCharacter.style.backgroundImage = "url('../images/3.png')";
      // Enable interactive elements
      enableInteractiveElements();
      break;
  }
}

// Play audio effect for auditory learning style
function playAudioEffect() {
  // In a real implementation, this would play a sound
  console.log("Playing audio effect for auditory learning style");
  // const audio = new Audio('audio/spanish-sample.mp3');
  // audio.play();
}

// Enable interactive elements for kinesthetic learning style
function enableInteractiveElements() {
  console.log("Enabling interactive elements for kinesthetic learning style");
  // In a real implementation, this would add event listeners for interactive elements
}

// Apply league effects
function applyLeagueEffects() {
  // Apply effects based on league
  switch(carpetState.league) {
    case 'bronze':
      carpetPreview.style.transform = 'translateY(0)';
      break;
    case 'silver':
      carpetPreview.style.transform = 'translateY(-10px)';
      break;
    case 'gold':
      carpetPreview.style.transform = 'translateY(-20px)';
      break;
    case 'diamond':
      carpetPreview.style.transform = 'translateY(-30px)';
      break;
  }
}

// Update stats display
function updateStatsDisplay() {
  // Update streak display
  const streakValue = document.querySelector('.carpet-stat:nth-child(1) .stat-value');
  if (streakValue) streakValue.textContent = carpetState.streakDays;
  
  // Update gems display
  const gemsValue = document.querySelector('.carpet-stat:nth-child(2) .stat-value');
  if (gemsValue) gemsValue.textContent = carpetState.gems;
  
  // Update league display
  const leagueValue = document.querySelector('.carpet-stat:nth-child(3) .stat-value');
  if (leagueValue) leagueValue.textContent = carpetState.league.charAt(0).toUpperCase() + carpetState.league.slice(1);
}

// Download carpet image
function downloadCarpet() {
  // In a real implementation, this would use html2canvas to capture the carpet
  // and download it as an image
  alert("Downloading your carpet image...\n\nNote: In the final implementation, this will create a PNG of your custom Magic Carpet design.");
}

// Share carpet on social media
function shareCarpet() {
  // In a real implementation, this would open a sharing dialog
  const shareText = "Check out my Magic Carpet on Duolingo! #MagicCarpetJourney";
  alert(`Sharing your carpet with message:\n${shareText}\n\nNote: In the final implementation, this will open a social sharing dialog.`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCustomizer);