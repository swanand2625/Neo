// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container">
      <h1>Neo4j Paper Explorer</h1>

      <div class="input-group">
        <input [(ngModel)]="paperId" placeholder="Enter Paper ID" />
        <button (click)="fetchPaperData()">Fetch</button>
      </div>

      <div *ngIf="paper" class="card">
        <h2> Paper Info</h2>
        <p><strong>ID:</strong> {{ paper.id }}</p>
        <p><strong>Title:</strong> {{ paper.title }}</p>
        <p><strong>Year:</strong> {{ paper.year }}</p>
        <p><strong>Publisher:</strong> {{ paper.publisher }}</p>
      </div>

      <div *ngIf="citations.length" class="card">
        <h3> Cites</h3>
        <ul>
        <li *ngFor="let cite of citations">{{ cite.id }} - {{ cite.title }}</li>

        </ul>
      </div>


    </div>
  `,
  styles: [`
    .container {
      padding: 30px;
      font-family: 'Segoe UI', sans-serif;
      max-width: 700px;
      margin: auto;
    }
    h1 {
      text-align: center;
      color: #2c3e50;
    }
    .input-group {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 60%;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-right: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      background-color: #3498db;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2980b9;
    }
    .card {
      background-color: #f7f9fc;
      padding: 15px;
      margin: 15px 0;
      border-left: 5px solid #3498db;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    ul {
      padding-left: 20px;
    }
  `]
})
export class AppComponent {
  paperId = '';
  paper: any = null;
  citations: any[] = [];
  citedBy: any[] = [];

  constructor(private http: HttpClient) {}

  fetchPaperData() {
    const pid = this.paperId.trim();

    if (!pid) return;


    this.http.get<any>(`http://localhost:3000/api/paper/${pid}`).subscribe(data => {
      this.paper = data;
    });


    this.http.post<any>('http://localhost:3000/api/citations', {
      paperId: pid
    }).subscribe(data => {
      this.citations = data.citations;
    });

 
  }
}