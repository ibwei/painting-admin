import { Component, Vue } from 'vue-property-decorator';
import { Tag, Modal, Button, Table } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import InfoModal from './infoModal';

@Component({
    name: 'messageBoard',
    components: {
        'a-tag': Tag,
        'info-modal': InfoModal,
        'a-modal': Modal,
        'a-button': Button,
        'a-table': Table,
    },
})
export default class messageBoard extends Vue {
    filterParams: any = {
        name: '',
        address: [],
        createtime: [],
        startTime: '',
        endTime: '',
    };

    BackParams: any = {
        code: 'data.result.resultCode',
        codeOK: 0,
        message: 'data.result.resultMessage',
        data: 'data.entity.data',
        total: 'data.entity.total',
    };

    outParams: any = {};

    filterList: FilterFormList[] = [
        {
            key: 'name',
            label: 'name',
            type: 'input',
            placeholder: '请输入区域名称',
        },
        {
            key: 'address',
            label: 'address',
            type: 'cascader',
            placeholder: '区域所在地址',
            options: city,
        },
        {
            key: 'createtime',
            label: 'Createtime',
            type: 'datetimerange',
            placeholder: ['start date', 'end date'],
            value: ['startTime', 'endTime'],
        },
    ];

    warnListModalShow: boolean = false;

    tableList: tableList[] = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     customRender: this.nameRender,
        // },
        {
            title: '姓名',
            dataIndex: 'name',
            customRender: this.nameRender,
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
        },
        {
            title: '微信号',
            dataIndex: 'wechat',
        },
        {
            title: '留言内容',
            dataIndex: 'content',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '登陆方式',
            dataIndex: 'isphone',
            customRender: this.isPhoneRender,
        },
        {
            title: '备注内容',
            dataIndex: 'results',
        },
    ];

    opreat: Opreat[] = [
        {
            key: 'edit',
            rowKey: 'id',
            color(value: any) {
                if (value.status === 0) {
                    return 'red'
                }
                return 'blue'

            },
            text(value: any) {
                if (value.status === 0) {
                    return '去处理'
                }
                return '已处理'


            },
            roles: true,
        },
        {
            key: 'delete',
            rowKey: 'id',
            color: 'red',
            text: '删除',
            roles: true,
            msg: '确定删除？',
        },
    ];

    changeVis: boolean = false;

    detailVis: boolean = false;

    title: string = '新增区域';

    visible: boolean = false;

    modelType: string = 'add';

    editData: object = {};

    dataSource: Array<any> = [];

    //打开地图的入口 [查看|编辑]
    openType: string = '';

    //地图需要展示的图形 [多边形,圆形,自定义等]
    type: string = '';

    handleOk() {
        this.detailVis = true;
    }

    nameRender(name: string, row: any) {
        return (
            <a-tag color="green">{name}</a-tag>
        )
    }

    isPhoneRender(isphone: number, row: any) {
        return (
            <a-tag color="blue">{isphone ? '手机' : 'PC'}</a-tag>
        )
    }

    handleCancel() {
        this.detailVis = false;
    }

    handleSelectDetail(data: string[], e?: any) {
        const tmp: any = [];
        const random = Math.floor(Math.random() * 10) + 1;
        const random2 = Math.floor(Math.random() * 10) + 1;
        data.forEach((item: any, index: number) => {
            tmp.push({
                name: item,
                type: `类型${index + random}`,
                area: `区域${index + random2}`,
            });
        });
        this.dataSource = tmp;
        this.detailVis = true;
    }

    genderRender(text: any) {
        return <a-tag color={text === '多边形' ? 'blue' : 'purple'}>{text}</a-tag>;
    }

    positionRender(id: number, others: any) {
        return <a-button onClick={this.showMap.bind(this, others)}>查看地理位置</a-button>;
    }

    areaError(num: number) {
        return (
            <a-tag onClick={this.showWarnDeviceList.bind(this, num)} color={num ? 'red' : 'grey'}>
                {num ? `${num}个异常设备` : '暂无异常设备'}
            </a-tag>
        );
    }

    mapVisible: boolean = false;

    showMap(others: any) {
        if (typeof others === 'object') {
            this.type = others.type;
            this.openType = 'read';
        } else if (others === '异常') {
            this.type = '异常';
            this.openType = 'read';
        } else {
            this.type = others;
            this.openType = 'edit';

        }
        this.mapVisible = true;
    }

    hideMapModal() {
        this.mapVisible = false;
    }

    tableClick(key: string, row: any) {
        const data = JSON.parse(JSON.stringify(row));
        this.type = row.type;
        switch (key) {
            case 'edit':
                this.openType = 'edit';
                this.editData = data;
                this.visible = true;
                this.title = '修改区域信息';
                this.modelType = 'edit';
                break;
            case 'delete':
                window.api.messageBoardBaseInfoDelete({ id: row.id }).then((res: any) => {
                    const { err_code } = res.data;
                    if (err_code === 0) {
                        this.$message.success('删除成功');
                        this.success();
                    } else {
                        this.$message.error('删除失败');
                    }
                });
                break;
            default:
                break;
        }
    }

    add() {
        this.title = '添加区域';
        this.modelType = 'add';
        this.visible = true;
        this.editData = {};
    }

    // 关闭地理位置故障列表modal
    hideWarnDeviceList() {
        this.warnListModalShow = false;
    }

    showWarnDeviceList(num: number) {
        if (num > 0) {
            this.showMap('异常');
        } else {
            this.$message.info('无设备故障');
        }
    }

    //编辑框传回来的edit
    showEditMap(type: string) {
        this.showMap(type);
    }

    closeModal() {
        this.visible = false;
        this.editData = {};
    }

    success() {
        this.visible = false;
        const Table2: any = this.$refs.baseInfoTable;
        this.editData = {};
        Table2.reloadTable();
    }

    render() {
        return (
            <div class="baseInfo-wrap">
                <filter-table
                    ref="baseInfoTable"
                    tableList={this.tableList}
                    filterList={this.filterList}
                    filterGrade={[]}
                    scroll={{ x: 900 }}
                    url={'/messageBoard/messageBoardList'}
                    filterParams={this.filterParams}
                    outParams={this.outParams}
                    addBtn={true}
                    exportBtn={false}
                    dataType={'json'}
                    rowKey={'id'}
                    opreat={this.opreat}
                    fetchType={'post'}
                    backParams={this.BackParams}
                    on-menuClick={this.tableClick}
                    on-add={this.add}
                />
            </div>
        );
    }
}
