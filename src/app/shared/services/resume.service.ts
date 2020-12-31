import { Injectable } from '@angular/core';

import { DevProject } from 'app/shared/models/dev-project.model';
import { Developer, NameValueModel } from 'app/shared/models';

@Injectable()
export class ResumeService {

  constructor() {
  }

  public async getDocumentDefinition(developer: Developer): Promise<object> {
    return {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [150, 'auto'],
            body: [
              [
                {
                  style: '',
                  text: ''
                },
                await this.getLogo('http://localhost:4200/logo-preview-1.svg'),
              ],
              [
                await this.addContactInfo(developer),
                this.addCommonInfo(developer)
              ],
            ]
          }
        },
      ],
      styles: this.addStyles()
    };
  }

  private addStyles(): object {
    return {
      header: {
        fontSize: 18,
        bold: true,
        margin: [20, 20, 0, 20],
        decoration: 'underline'
      },
      description: {
        margin: [0, 0, 10, 0]
      },
      skillsColumns: {
        margin: [0, 0, 0, 0]
      },
      mt20: {
        margin: [0, 20, 0, 0]
      },
      mt10: {
        margin: [0, 10, 0, 0]
      },
      skills: {
        bold: true
      },
      languages: {
        margin: [20, 0, 0, 0],
        bold: true
      },
      name: {
        margin: [20, 0, 0, 0],
        fontSize: 16,
        bold: true,
        alignment: 'left',
      },
      hourlyRate: {
        margin: [40, 10, 0, 10]
      },
      head: {
        margin: [0, 0, 0, 30],
        fillColor: 'black'
      },
      exp: {
        margin: [0, 5, 0, 5]
      },
      left: {
        alignment: 'left'
      }
    };
  }

  private async getLogo(photo): Promise<object> {
    if (photo) {
      return {
        image: await this.getBase64ImageFromURL(photo),
        width: 90,
        alignment: 'right',
        margin: [0, 0, 0, 0]
      };
    }
    return null;
  }

  private async getProfilePicObject(photo): Promise<object> {
    if (photo) {
      return {
        image: await this.getBase64ImageFromURL(photo),
        width: 120,
        alignment: 'left',
        margin: [0, 20, 20, 0]
      };
    }
    return null;
  }

  private getBase64ImageFromURL(url): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  private async addContactInfo(developer: Developer): Promise<any> {
    return [
      developer.photo ? await this.getProfilePicObject(developer.photo) : {},
      developer.firstName
        ? {
          text: developer.firstName,
          style: 'name'
        }
        : {text: ''},
      developer.lastName
        ? {
          text: developer.lastName,
          style: 'name'
        }
        : {text: ''},
      developer.devProperties.hourlyRate
        ? {
          text: `${ developer.devProperties.hourlyRate }$/hr`,
          style: 'hourlyRate'
        }
        : {text: ''},
      developer.address
        ? {
          style: 'mt10',
          fontSize: 9,
          text: developer.address
        }
        : {text: ''},
      developer.phone
        ? {
          fontSize: 9,
          text: developer.phone,
        }
        : {text: ''},
      developer.email
        ? {
          fontSize: 9,
          text: developer.email,
        }
        : {text: ''},
    ];
  }

  private addCommonInfo(developer: Developer): Array<object> {
    return [
      {
        text: 'PROFESSIONAL SKILLS',
        style: 'header',
      },
      this.addSkills(developer),
      {
        text: 'SOFT SKILLS',
        style: 'header'
      },
      this.addSoftSkills(developer),
      {
        text: 'LANGUAGES',
        style: 'header'
      },
      this.addLanguages(developer.devProperties.languages),
      /* \
       {
         text: 'CERTIFICATES',
         style: 'header'
       },
       */
      {
        text: 'WORK EXPERIENCE',
        style: 'header'
      },
      this.addExpirience(developer),
  ];
  }

  private addSkills(developer: Developer): object {
    return developer.devProperties.skills
      ? {
      style: 'skillsColumns',
      columns: [
        [
          {
            style: 'description',
            text: developer.devProperties.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam beatae dicta dignissimos dolorem ea eaque error illum in laboriosam magni necessitatibus nulla, odio optio perspiciatis provident, qui quibusdam sapiente vel!'
          }
        ],
        [
           ...developer.devProperties.skills.map(s => {
            return {
              style: 'skills',
              text: `${ s.name }:`
            };
          }),
        ],
        [
          ...developer.devProperties.skills.map(s => {
            return {
              style: 'skills',
              text: `${ s.value * 20 }%`
            };
          }),
        ]
      ]
    } : {text: ''};
  }

  private addSoftSkills(developer: Developer): object {
    return developer.devProperties.softSkills ? {
      style: 'languages',
      columns: [
        [
          ...developer.devProperties.softSkills.map(s => {
            return {
              style: 'skills',
              text: `${ s.name }:`
            };
          }),
        ],
        [
          ...developer.devProperties.softSkills.map(s => {
            return {
              style: 'skills',
              text: `${ s.value }%`
            };
          }),
        ]
      ]
    } : {text: ''};
  }

  private addLanguages(languages: Array<NameValueModel>): object {
    return languages ? {
      style: 'languages',
      columns: [
        [
          ...languages.map((el) => {
            return {
              text: `${ el.name }:`
            };
          })
        ],
        [
          ...languages.map((el) => {
            return {
              text: this.addLanguageLevel(el.value)
            };
          })
        ],
        []
      ]
    } : {text: ''} ;
  }

  private addLanguageLevel(val: number): string {
    switch (val) {
      case 1:
      case 2:
        return 'pre-Intermediate';
      case 3:
      case 4:
        return 'Intermediate';
      case 5:
      case 6:
        return 'Upper-Intermediate';
      default:
        return 'N/A';
    }
  }

  private addExpirience(developer: Developer): Array<object> {
    return developer.devProperties.projects
      ? developer.devProperties.projects.map(el => this.addProject(el)) : [{text: ''}];
  }

  private addProject(exp: DevProject): object {
    return {
      style: 'exp',
      columns: [
        [
          {text: 'Title'},
          {text: `${ exp.title }`}
        ],
        [
          {text: 'Date'},
          {text: `from: ${ this.addDate(exp.from) }`},
          {text: `to: ${ this.addDate(exp.to) }`}
        ],
        [
          {text: 'Technologies'},
          exp.technologies.map(el => {
            return {
              text: el.name
            };
          })
        ]
      ],
    };
  }

  private addDate(d: Date): string {
    const date = new Date(d);
    return `${ date.getDate() }-${ date.getMonth() }-${ date.getFullYear() }`;
  }
}
