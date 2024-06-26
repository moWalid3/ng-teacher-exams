import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Choices,
  Question,
  Subject,
} from '../../../../shared/interfaces/subject';

@Component({
  selector: 'app-subject-questions',
  templateUrl: './subject-questions.component.html',
  styleUrl: './subject-questions.component.scss',
})
export class SubjectQuestionsComponent implements OnInit {
  question: string = '';
  answers: string[] = ['', '', '', ''];
  correctAnswer: Choices = '' as Choices;

  allQuestions: Question[] = [];

  subjectName: string = '';
  isQuesValid: boolean = false;

  constructor(
    private _TeacherService: TeacherService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.forEach(
      (param) => (this.subjectName = param.get('subject')!)
    );
  }

  onSubmit() {
    let subject: Subject = {
      date: new Date(),
      name: this.subjectName,
      questions: this.allQuestions,
    };

    this._TeacherService.setSubject(subject).subscribe((res) => {
      this._Router.navigate(['/new-exam/show-exam', res.id]);
    });
  }

  onCancel() {
    this._Router.navigate(['/new-exam/subject-name']);
    this.resetInputs();
    this.subjectName = '';
    this.allQuestions = [];
  }

  onDelete() {
    this.toastr.info('تم حذف السؤال بنجاح');
    this.resetInputs();
  }

  onSave() {
    this.checkQuestionValid();
    if (this.isQuesValid) {
      this.toastr.success('تم حفظ السؤال بنجاح');

      this.allQuestions.push({
        question: this.question,
        answers: {
          A: this.answers[0],
          B: this.answers[1],
          C: this.answers[2],
          D: this.answers[3],
        },
        correctAnswer: this.correctAnswer,
      });

      this.resetInputs();
    }
  }

  checkQuestionValid() {
    if (this.question) {
      let isEmpty = this.answers.some((ans) => ans === '');
      if (isEmpty) {
        this.toastr.error('ادخل جميع الاجابات');
      } else {
        if (this.correctAnswer) {
          this.isQuesValid = true;
        } else {
          this.toastr.error('اختر الاجابة الصحيحه');
        }
      }
    } else {
      this.toastr.error('السؤال غير مجود');
    }
  }

  private resetInputs() {
    this.question = '';
    this.answers = ['', '', '', ''];
    this.correctAnswer = '' as Choices;
    this.isQuesValid = false;
  }
}
