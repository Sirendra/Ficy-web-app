import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-picture',
  imports: [CommonModule],
  templateUrl: './header-section.component.html',
})
export class CommonPictureComponent {
  @Input() backgroundUrl = '/home.jpeg';
  @Input() title = 'Explore A Song of Ice and Fire';
  @Input() description =
    'Journey through the epic saga of Westeros and Essos—where noble houses clash, ancient magic stirs, and destinies are forged in fire and blood. From the Wall to the Iron Throne, uncover the lore behind George R. R. Martin’s legendary world.';
  @Input() exploreSectionTitle = 'Discover the Characters, Houses, and Books';
  @Input() exploreSectionDescription =
    "Explore the rich tapestry of heroes, villains, and myths. Learn about the Seven Kingdoms, their great houses, and the stories that shape the realms. Whether you're a Maester or a newcomer, adventure awaits you.";
  @Input() showExplore = true;

  scrollToExplore() {
    const element = document.getElementById('explore-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
