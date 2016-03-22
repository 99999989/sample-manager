import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {User} from "../models/user";
import {Project} from "../models/project";
import {Question} from "../models/question";
import {Rule} from "../models/rule";
import {Answer} from "../models/answer";

@Injectable()
export class UserService {
  constructor() {
  }
  private _user:User;
  public getUser(id: string): User {
    if (this._user) { return this._user}

    let rule1:Rule = new Rule('rule-1', '08:00', '18:00', 2);
    let rule2:Rule = new Rule('rule-2', '10:00', '20:00', 1);
    let rules:Rule[] = [rule1, rule2];

    let answer1:Answer = new Answer('answer-1', '2016-03-20 13:21:23', 'nie', '47.399921, 8.621802', null, rule1);
    let answer2:Answer = new Answer('answer-2', '2016-03-20 09:54:25', 'nie', '47.399921, 8.621802', null, rule1);
    let answer3:Answer = new Answer('answer-3', '2016-03-20 11:25:21', 'nie', '47.399921, 8.621802', null, rule2);
    let answer4:Answer = new Answer('answer-4', '2016-03-20 19:33:13', 'nie', '47.399921, 8.621802', null, rule2);

    let question1:Question = new Question('question-1', 'Häufigkeit', 'Wie oft haben Sie heute schon geflucht?', 'nie,<5,<10,>10', [answer1, answer2], null, rules);
    let question2:Question = new Question('question-2', 'Ja/Nein', 'Befinden Sie sich gerade in einer Gruppe?', 'Ja,Nein', [answer3, answer4], null, rules);
    let questions:Question[] = [question1, question2];

    let project1:Project = new Project('project-1', 'Project Subject 1', '2016-03-20', questions, null, 'http://www.freebiewebresources.com/wp-content/uploads/2013/12/Twilight-Wallpaper-for-Free.jpg');
    let project2:Project = new Project('project-2', 'Project Subject 2', '2016-03-21', [], null, 'http://www.magazinehive.com/wp-content/uploads/2013/09/Beautiful-Sunset-Free-Download.jpg');
    let projects:Project[] = [project1, project2];

    question1.project = project1;
    question2.project = project1;
    let user:User = new User('user-1', 'user1', 'user1@mail.com', '', projects);
    answer1.user = user;
    answer2.user = user;
    answer3.user = user;
    answer4.user = user;

    project1.users = [user];
    project2.users = [user];

    this._user = user;
    return user;
  }

}
