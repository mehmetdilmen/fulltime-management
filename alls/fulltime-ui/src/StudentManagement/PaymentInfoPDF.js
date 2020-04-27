import React, {Component} from "react";
import {Table} from "antd";
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

const {Column, ColumnGroup} = Table;

export class PaymentInfoPDF extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const person = this.props.data;

        const styles = StyleSheet.create({
            page: {
                fontFamily: 'Roboto',
            },
            table: {
                display: "table",
                width: "auto",
                borderStyle: "solid",
                borderWidth: 1,
                borderRightWidth: 0
            },
            tableRow: {
                margin: "auto",
                flexDirection: "row"
            },
            tableCol: {
                width: "20%",
                borderStyle: "solid",
                borderWidth: 1,
                borderLeftWidth: 0,
                borderTopWidth: 0
            },
            tableCell: {
                margin: "auto",
                marginTop: 5,
                fontSize: 10,
            },
            inside: {
                margin: "auto",
                marginTop: 5,
                fontSize: 10

            }
        });

        return (
            <Document>
                <Page size="A4" style={styles.body}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Taksit Sayısı</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Tutar</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Son Ö.T</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Ödeme Tarihi</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Durum</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                {
                                    person.map(p => (
                                        <Text style={styles.inside}>{p.installNumber}</Text>
                                    ))
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    person.map(p => (
                                        <Text style={styles.inside}>{p.installPay}</Text>
                                    ))
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    person.map(p => (
                                        <Text style={styles.inside}>{p.installmentDate}</Text>
                                    ))
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    person.map(p => (
                                        <Text style={styles.inside}>{p.payDate}</Text>
                                    ))
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    person.map(p => (
                                        <Text style={styles.inside}>
                                            {p.isItPaid ?
                                                <Text>Ödendi</Text> : <Text>Ödenmedi</Text>}
                                        </Text>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        );

    }

}

