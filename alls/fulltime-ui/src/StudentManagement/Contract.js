import React, {Component} from "react";
import font from "../fonts/Roboto-Medium.ttf"
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";
Font.register({ family: 'Roboto',   format: "truetype",
    src: font });

export class PdfDocument extends Component {
    constructor(props) {
        debugger
        super(props)
    }

    render() {
        debugger
        const person = this.props.data;
        console.log(person)

        const styles = StyleSheet.create({
            page: {
                backgroundColor: "#ffffff",
                fontFamily: 'Roboto'
                // margin: 50
            },
            section: {
                display: "block",
                position: "relative",
                width: "300",
                fontSize: 12
            },
            kdv: {
                display: "block",
                position: "relative",
                width: "300",
                fontSize: 9
            },
            sectionAlt: {
                marginBottom: 20
            },
            madde: {
                top: 1,
                margin: 2,
                padding: 2,
                display: "block",
                position: "relative",
            },
            speacial: {
                top: 2,
                margin: 3,
                padding: 3,
                marginLeft: 20,
                display: "block",
                position: "relative",
            },
            header: {
                fontSize: 10,
                top: 20,
                alignItems: "center",
                textAlign: "center"
            },
            membershipInfo: {
                top: 15,
                marginLeft: "7%",
                marginRight: "10%"
            },
            infoText: {
                display: "block",
                position: "relative",
                width: "100%",
                fontSize: 8
            },
            content: {
                fontSize: 8,
                textAlign: "left",
                marginLeft: "7%",
                marginRight: "10%"
            },
            headerRight: {
                textAlign: "right",
                alignItems: "right",
                marginTop: 10
            },
            pageStartDate : {
                fontSize: 8,
                display: "block",
                width: "100%",
                marginRight: "23%",
            }
        });


        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <HeaderRight/>
                    <Header/>
                    <Content/>
                    <KDV/>
                    <MemberShipInfo/>
                </Page>
            </Document>
        );



        function HeaderRight() {
            return (
                <View style={styles.headerRight}>
                    <Text style={styles.pageStartDate}>Tarih: </Text>
                    <Text style={styles.pageStartDate}>No: </Text>
                </View>
            );
        }


        function Header() {
            return (
                <View style={styles.header}>
                    <Text style={styles.section}>ENGLISHFULLTIME</Text>
                    <Text style={styles.section}>KURSİYER SÖZLEŞMESİ</Text>
                    <Text style={styles.sectionAlt}></Text>
                </View>
            );
        }


        function Content() {
            return (
                <View style={styles.content}>
                    <Text style={styles.madde}>
                        1- Bir tarafta Pirdan Özel Eğitim Hizmetleri (ENGLISHFULLTIME) ile diğer tarafta anlaşmışlardır.
                        Pirdan Özel Eğitim Hizmetleri bundan böyle (ENGLISHFULLTIME) olarak anılacaktır.
                    </Text>
                    <Text style={styles.madde}>
                        2- Kursiyer ENGLISHFULLTIME kurslarında hafta süreli ders saati kurs almayı kabul eder. İş bu
                        kurs bedeli olarak ENGLISHFULLTIME kursları'na TL'yi aşağıdaki ödeme planı dahilinde ödeyeceğimi
                        kabul ve taahhüt eder, bu taksitler için adet senet tanzim edilmiş olup, diğer kalan tüm
                        alacağım muacceliyet kesbedeceğini, icra masraflarını ve vekalaet ücretlinin tarafıma ait
                        olacağını, geciken günler için aylık % 10'dan temerrüd faiz uygulmasını kendi rızasıyla kabul ve
                        taahhüt eder.
                    </Text>
                    <Text style={styles.madde}>
                        3- İş bu sözleşmenin 5. maddesinde belirtilen (625 sayılı yasa ve bağlı mevzuata uygun) durumlar 2.maddenin istisnasıdır.
                    </Text>
                    <Text style={styles.madde}>
                        4- Kursiyer satın aldığı paket programın süresi içinde, iş bu sözleşmenin 5. maddesinde belirtilen haller dışında herhangi bir nedenle kurstan ayrılmak isterse mazeretleri geçersiz olup devam etmek zorundadır. Kurumdan kaynaklanan sebeplerdeb dolayı yapılmayan dersler kurum müdürlüğünce kursiyerinde görüşleri alınarak en yakın ileri tarihte telafi edilir.
                    </Text>
                    <Text style={styles.madde}>
                        5- 04/06/1998 tarih ve 19832 sayılı resmi gazetede yayınlanan Özel Eğitim Kurumları Öğrenci Ücretleri Tespit ve Tahsil yönetmenliğinin 10. maddesi gereğince;
                    </Text>
                    <Text style={styles.speacial}>
                        A- Kursiyerlerin İl İlçe/ İl Dışı Nakil: İl içinden kasıt büyük şehir sınırları dışına 		     çıkmasıdır. Bu hususun belgelendirilmesi yükümlülüğü öğrenciye ait olup, 	    	     sadecemuhtarlık kaydı ve ikametgah nakli belge olarak kabul edilmeyecektir. 	     Öğrencinin nakilinin başka inandırıcı delirlerle ispatlanması gerekmetedir.
                    </Text>
                    <Text style={styles.speacial}>
                        B- Kursiyerin sağlık durumunun derslere devam edemeyecek durumda olduğunun 	     heyet raporuyla belgelenmesi.
                    </Text>
                    <Text style={styles.speacial}>
                        C- Kurumun kapanması.
                    </Text>
                    <Text style={styles.speacial}>
                        D- Kursiyerin yurt dışına çıkışlarda (en az 1 olmak kaydıyla) pasaport, vize, uçak 	     biletletini getirmesi.
                    </Text>
                    <Text style={styles.speacial}>
                        E- Kursiyerin kurumdan ekonomik nedenlerle okuyamayacak duruma düştüğünü 	     gösterir resmi makamlardan alınan belgelerle teşvik edilmesi (Bu husuta 	     	     muhtardan alınan evrak geçerli bir belge olarak kabul edilmeyecektir. Bu 	  	     hususun başka inandırıcı delirlerle ispatlanması gerekmektedir. Yine öğrenci  	     veya velisinin işten alınması ile ilgili işyerinden alınan belgeler ekonomik 	  	     sıkıntının doğduğu anlamına gelmez.) durumlarında kursiyerin ayrılış tarihine 	     kadar aldığı eğitim bedeli tahsil edilir. Geriye kalan peşin ödemelerde varsa 	   	     bakiye, taksitli ödemelerde varsa senet iade edilir.
                    </Text>
                    <Text style={styles.madde}>
                        6- ENGLISHFULLTIME sınıf mevcudunun kurumu zarara uğratacak ölçüde azalması durumunda kursiyerlerin uygun saat ve seviyedeki sınıflarla birleştirebilir.
                    </Text>
                    <Text style={styles.madde}>
                        7- Başvuru tarihinde öğrenciye kimlik kartı verilir. 5. madde gereğince kurumdan ayrılmak zorunda kalan kursiyer, ödemesi gereken tüm borçlarını ödemeden ayrılma işlemi başlatılmaz ve ayrılma başvurusu geçersiz sayılır.
                    </Text>
                    <Text style={styles.madde}>
                        8- Kursiyer sözleşmeli olduğu programın son iki ayında kayıt iptali yapamaz.
                    </Text>
                    <Text style={styles.madde}>
                        9- ENGLISHFULLTIME uygun gördüğü öğrenci değişikliğini yapabilir.
                    </Text>
                    <Text style={styles.madde}>
                        10- Kursiyer reşit olmaması halinde iş bu sözleşme velisi tarafından imzalanır ve bonolar velisi tarafından tanzim edilir. Bu durumda sözleşme hükümleri hem velisi hemde kursiyer için geçerlidir.
                    </Text>
                    <Text style={styles.madde}>
                        11- Kursiyer bu sözleşmede belirtilen adresin yasal tebligat adresi olduğunu ve bu adrese yapılacak her türlü posta ve tebligatların yasal ikametgah adresi yapılmış sayılacağını kabul ve taahhüt eder. İş bu adresi değiştirmesi halinde 10 gün içerinde ENGLISHFULLTIME'a bildirmeyi kabul ve taahhüt ederler.
                    </Text>
                    <Text style={styles.madde}>
                        12- İş bu sözleşmeden kaynaklanacak her türlü ihtilaflarda İSTANBUL mahkemelerinin ve icra dairelerinin yetkili olduğunu kabul ve taahhüt ederler.
                    </Text>
                    <Text style={styles.madde}>
                        13- İş bu sözleşme bu madde dahil 13 maddeden oluşan müteşekkil olup iki nüsha olarak kendi serbest iradesi ile tanzim ve imza altına almıştır.
                    </Text>
                </View>
            );
        }

        function KDV() {
            return (
                <View style={styles.header}>
                    <Text style={styles.kdv}>FİYATLARIMIZA KDV DAHİL DEĞİLDİR.</Text>
                    <Text style={styles.sectionAlt}></Text>
                </View>
            );
        }

        function MemberShipInfo() {
            return (
                <View style={styles.membershipInfo}>
                    <Text style={styles.infoText}>Kursiyer Adı :  {person.studentName}</Text>
                    <Text style={styles.infoText}>Adres :  {person.studentAddres}</Text>
                    <Text style={styles.infoText}>Telefon :  {person.studentPhone}</Text>
                    <Text style={styles.infoText}>Kayıt Tarihi :  {person.studentCreatedDate}</Text>
                </View>
            );
        }

        function PaymentPlan() {
            return (
                <View style={styles.membershipInfo}>
                    <Text style={styles.infoText}>Kursiyer Adı :  {person.studentName}</Text>
                    <Text style={styles.infoText}>Adres :  {person.studentAddres}</Text>
                    <Text style={styles.infoText}>Telefon :  {person.studentPhone}</Text>
                    <Text style={styles.infoText}>Kayıt Tarihi :  {person.studentCreatedDate}</Text>
                </View>
            );
        }


    }

}

