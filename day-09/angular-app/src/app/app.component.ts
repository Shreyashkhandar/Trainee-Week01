import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/" aria-label="Fieldwork home">
          <span class="brand-mark">F</span>
          <span>Fieldwork<small>FACILITY OPERATIONS</small></span>
        </a>
        <p class="nav-label">WORKSPACE</p>
        <nav aria-label="Main navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <span class="nav-icon">01</span> Overview
          </a>
          <a routerLink="/inspections/new" routerLinkActive="active">
            <span class="nav-icon">02</span> New inspection
          </a>
        </nav>
        <div class="sidebar-note">
          <span class="online-dot"></span>
          <span>Inspection service<small>Local training API</small></span>
        </div>
      </aside>

      <main class="main-area">
        <header class="utility-bar">
          <span>OPERATIONS <span class="crumb-separator">/</span> FACILITIES</span>
          <span class="today-label">FIELD REVIEW · 2026</span>
        </header>
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
