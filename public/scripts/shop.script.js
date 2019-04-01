(() => {
    const apiUrl = 'http://localhost:2345/api';
    const data = {
        products: [],
        page: 1,
        limit: 10,
        count: 0,
        sum: 0,
        average: 0,
        searchCriteria: {
        },
        modalTitleNew: 'New Product',
        modalTitleEdit: 'Product Id:',
        modalTitleDelete: 'Delete Product Id:',
        modalActionSave: 'Save',
        modalActionUpdate: 'Update',
        actionId: '',
        actionProduct: {}
    }
    const contentRowStyle = {
        'background': '#eeeeee',
        'border-bottom': '1px solid #aaaaaa'
    }
    window.onload = async function() {
        data.searchCriteria = {
            title: '',
            page: data.page,
            count: data.limit
        };
        await refreshData();
        $('#nextPage').click(nextPage);
        $('#previosPage').click(previosPage);
        $('#searchTitle').keyup(searchTitle);
        $('#saveProduct').click(saveItem);
        $('#deleteProduct').click(deleteItem);
        $('#productNewButton').click(resetFormData);
    };
    const searchTitle = async function () {
        setTimeout(() => {
            data.searchCriteria.title = $('#searchTitle').val() || '';
            refreshData();
        }, 500);
    }
    const nextPage = async function () {
        if (Math.ceil(data.count / data.limit) > data.page) {
            data.searchCriteria.page = data.page + 1;
            setProducts(await getProducts(data.searchCriteria));
            data.page++;
            setPage(data.page);
        }
    }
    const previosPage = async function () {
        if (data.page > 1) {
            data.searchCriteria.page = data.page - 1;
            setProducts(await getProducts(data.searchCriteria));
            data.page--;
            setPage(data.page);
        }
    }
    const setPage = function (page) {
        $('#currentPage').text('Page: ' + page + '(' +
            Math.ceil(data.count / data.limit) + ')');
    }
    const refreshData = async function () {
        setProducts(await getProducts(data.searchCriteria));
        const countSum = await getCount(data.searchCriteria
            .title ? { title: data.searchCriteria.title } : {});
        setCount(countSum.count);
        setSum(countSum.sum);
        setPage(data.page);
    }
    const setProducts = function (prods) {
        data.sum = 0;
        $('#contentElement').html('');
        let fields = {};
        prods.map((prod, i) => {
            data.sum += prod.price;
            const tr = document.createElement('div');
            tr.className = 'content-row row';
            setField(prod.id, tr, 'product-id', {'display':'none'});
            setField(i + 1, tr, 'content-item col-1', contentRowStyle);
            setField(prod.title, tr, 'content-item col-2', contentRowStyle);
            setField(prod.category, tr, 'content-item col-2', contentRowStyle);
            setField(prod.description, tr, 'content-item col-3', contentRowStyle);
            setField(prod.price, tr, 'content-item col-1', contentRowStyle);
            const imgWrapper = $(document.createElement('div'))
                .addClass('content-item col')
                .css(contentRowStyle);
            $(document.createElement('img'))
                .attr('src', prod.image)
                .css({
                    'width': '150px'
                })
                .appendTo(imgWrapper);
            imgWrapper.appendTo(tr);
            $(document.createElement('button'))
                .text('Edit')
                .addClass('btn btn-secondary')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#productNew')
                .click(editProduct)
                .appendTo(tr);
            $(document.createElement('button'))
                .text('Delete')
                .addClass('btn btn-secondary')
                .click(deleteProduct)
                .attr('data-toggle', 'modal')
                .attr('data-target', '#productDelete')
                .appendTo(tr);
            $(tr).appendTo('#contentElement');
        });
    }
    const setField = function (text, parent, className, cssObj) {
        $(document.createElement('div'))
            .html(text)
            .addClass(className)
            .css(cssObj)
            .appendTo(parent);
    }
    const setSum = function (sum) {
        data.sum = sum;
        $('#sumElement').text(sum);
    }
    const setCount = function (count) {
        data.count = count;
        $('#countElement').text(count);
    }
    const getProducts = async function (searchData) {
        data.products = await send('GET', apiUrl + '/goods', searchData);
        return data.products;
    }
    const getValueToSaveProduct = function () {
        const formProd = {
            title: $('#newTitle').val(),
            category: $('#newCategory').val(),
            description: $('#newDescription').val(),
            price: $('#newPrice').val(),
            image: $('#newImage')[0].files[0]
        }
        if ($('#saveProduct').text() == data.modalActionUpdate) {
            formProd.id = data.actionProduct.id;
        }
        return formProd;
    }
    const setValueToEditProduct = function () {
        $('#productId').text(data.modalTitleEdit + data.actionProduct.id);
        $('#newTitle').val(data.actionProduct.title);
        $('#newCategory').val(data.actionProduct.category);
        $('#newDescription').val(data.actionProduct.description);
        $('#newPrice').val(data.actionProduct.price);
        $('#saveProduct').text(data.modalActionUpdate);
        $('#newImage').val(null);
    }
    const resetFormData = function () {
        $('#productId').text(data.modalTitleNew);
        $('#newTitle').val('');
        $('#newCategory').val('');
        $('#newDescription').val('');
        $('#newPrice').val(0);
        $('#saveProduct').text(data.modalActionSave);
        data.actionProduct = {};
    }
    const saveItem = async function () {
        const prod = getValueToSaveProduct();
        const url = apiUrl + '/goods/' + (prod.id ? 'update' : 'create');
        await send('POST', url, prod);
        await refreshData();
    }
    const deleteItem = async function () {
        const url = apiUrl + '/goods/delete';
        await send('GET', url, { id: data.actionProduct.id });
        await refreshData();
    }
    const editProduct = function (e) {        
        resetFormData();
        const id = $(e.target.parentNode.querySelector('.product-id')).text();
        data.actionProduct = data.products.filter(p => p.id == id)[0];
        setValueToEditProduct();
    }
    const deleteProduct = function (e) {
        resetFormData();
        const id = $(e.target.parentNode.querySelector('.product-id')).text();
        data.actionProduct = data.products.filter(p => p.id == id)[0];
        $('#deleteProductId').text(data.modalTitleDelete + data.actionProduct.id);
    }
    const getCount = async function (searchData) {
        return (await send('GET', apiUrl + '/goods/count', searchData));
    }
    const send = function (method, url, data) {
        return new Promise((result, reject) => {
            const req = new XMLHttpRequest();
            let reqUrl = url;
            const formData = new FormData();
            if (method == 'GET') reqUrl += setParams(data);
            if (method == 'POST') {
                if (data.image) formData
                    .append('image', data.image, data.image.name);
                formData.append('title', data.title);
                formData.append('category', data.category);
                formData.append('description', data.description);
                formData.append('price', data.price);
                if (data.id) formData.append('id', data.id);
            }

            req.onreadystatechange = function () {
                if (this.readyState == 4) if(this.status == 200) {
                    result(JSON.parse(this.response));
                } else {
                    reject({ error: this });
                }
            }
            req.open(method, reqUrl, true);
            req.send(method == 'GET' ? {} : formData);
        });
    }
    const setParams = function (data) {
        const keys = Object.keys(data);
        let str = '?';
        keys.map(key => {
            str += key + '=' + data[key] + '&';
        })
        return str;
    }
})()