import React, {Component} from "react";
import {Table} from "antd";
import Moment from "react-moment";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet
} from "@react-pdf/renderer";


const {Column, ColumnGroup} = Table;

export class PaymentInfoPDF extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const person = this.props.data;

        const styles = StyleSheet.create({
            page: {
                backgroundColor: "#ffffff"
                // margin: 50
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            },
            logo: {
                width: 101,
                height: 95
            },
            header: {
                display: "block",
                top: 5,
                padding: 20,
                flexDirection: "row",
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#d6d7da",
                alignItems: "center",
                justifyContent: "space-between"
            },
            headerLeft: {
                flexDirection: "row",
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#d6d7da",
                alignItems: "center"
            },
            headerRight: {
                marginRight: 50
            },
            headerLead: {
                fontSize: 20,
                fontWeight: "bold"
            },

            columnInstallmentsClass: {
                display: "block"
            }

        });

        return (
            <Document>
                <Page style={styles.page}>
                    <Header></Header>
                </Page>
            </Document>
        );


        function Header() {
            return (
                <View>
                    {
                        person === undefined ?
                            person.all_periods.map(period => {
                                debugger
                                if (period.payment !== "cash") {
                                    period.planingInstallment.map(p => (
                                            <View style={styles.header}>

                                                <View style={styles.columnInstallmentsClass}>
                                                    <Text>Taksit Sayisi: {p.installNumber}</Text>

                                                    <Text>Tutar: {p.installPay}</Text>

                                                    <Text>Son Ödeme Tarihi: {p.installmentDate}</Text>

                                                    <Text>Ödeme Tarihi: {p.payDate}</Text>

                                                    {p.isItPaid ? <Text>Durum: Ödendi</Text> : <Text>Durum: Ödenmedi</Text>}
                                                </View>
                                            </View>

                                        )
                                    )
                                }

                            })
                            : null}
                </View>

            );
        }


    }

}

