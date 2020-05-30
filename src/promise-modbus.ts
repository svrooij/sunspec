import ModbusRTU from 'modbus-serial';

export class PromiseModbus extends ModbusRTU {
    constructor(private host: string, private port: number) {
        super();
    }

    private async connect(): Promise<void> {
        await this.closeAsync();
        await this.connectTCP(this.host, { port: this.port });
        this.setID(1);
        this.setTimeout(3000);
    }

    public closeAsync(): Promise<void> {
        if(!this.isOpen){
            return Promise.resolve();
        }
        // console.log('Closing');
        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {
                reject();
            }, 1000)
            this.close(() => {
                if(timeout) clearTimeout(timeout)
                resolve();
            })
        })
    }

    public openAsync(): Promise<boolean> {
        if(this.isOpen) {
            return Promise.resolve(true);
        }
        // console.log('Opening connection')
        return new Promise<boolean>((resolve, reject) => {
            this.open(() => {
                resolve(this.isOpen);
            })
        })
    }

    public async waitOpenAsync(): Promise<void> {
        await this.connect();
        while(!this.isOpen) {
            await this.openAsync();
        }
    }


}