using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ReceByteBackend.Models.Baza;

namespace ReceByteBackend.Models.Recepti
{
    [Serializable]
    public class DTORecept
    {
         public int ID { get; set; }
         
        [Required(ErrorMessage = "Naziv Required")] 
        public string Naziv { get; set; }

        [Required(ErrorMessage = "Tekst Required")]
        public string Tekst { get; set; }

        [Required(ErrorMessage = "ImgPath Required")]
        public string ImgPath { get; set; }

        [Required(ErrorMessage = "KcalVrednost Required")]
        public int KcalVrednost { get; set; }

        [Required(ErrorMessage = "BrojPorcija Required")]
        public int BrojPorcija { get; set; }  

        [Required(ErrorMessage = "VremePripreme Required")]    

        public int VremePripreme { get; set; }  

        [Required(ErrorMessage = "Autor Required")]
        public string Autor { get; set;}

        [Required(ErrorMessage = "ProsecnaOcena Required")]
        public float ProsecnaOcena { get; set;}

        public List<Namirnice> Namirnicee {get;set;}

        public List<DTOKomentari> Komentarii { get; set;}
    }
}