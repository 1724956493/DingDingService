Ext.define('core.util.EmployeeCombo',{  
    extend : 'Ext.form.field.ComboBox',  
    alias: 'widget.EmployeeCombo',  
    multiSelect : false,  
    displayField: 'psnname',
    valueField: 'psnbasdocpk',
    forceSelection :true,
    
	config:{  
	    isdeptparam : false, 
	    deptparam : '',
    },  
      
    store:Ext.create('Ext.data.Store',{
    		 fields : ['psndocpk',
  	 		   'psnbasdocpk',
  	 		   'psnname',
  	 		   'id',
  	 		   'deptname' 		   
  	           ]   , 		

     proxy: {
            type: 'ajax',
            url:'./json/bdpsndoc_searchEmp',
            reader: {
                type: 'array'
            },
            actionMethods:{
            	read:'POST'
            }
        },
      sorters: [{
            property: 'deptname',
            direction: 'ASC'
        }]
    }),  	   	
   
    listeners: {
    	expand : function(field, eOpts) {
  	 	var store = field.getStore();
  	 	store.removeAll();
        if(field.getIsdeptparam()){
        	if(field.getDeptparam() == ''){
        	    Ext.Msg.alert('提示','请先选择部门！');
        	    return;
        	}else if(field.getValue()){
        		store.getProxy().extraParams ={psnname : field.getValue(),deptparam :field.getDeptparam()};
        	}else{
        		store.getProxy().extraParams ={psnname : '',deptparam :field.getDeptparam()};
        	} 
        	store.load();
        }else if(field.getValue()){
        	store.getProxy().extraParams ={psnname : field.getValue(),deptparam :field.getDeptparam()};
        	store.load();
        }
    },
    

   },
    
    
    createPicker : function(){  
        var me = this;  
          
        var picker = Ext.create('Ext.grid.Panel', {  
            store: me.store,  
            frame : true,  
            resizable : true,  
            border : 0 ,
            columns : [{  
                text : 'pk',  
                dataIndex : 'psndocpk',hidden:true  
            },{  
                text : '部门' ,  
                dataIndex : 'deptname'  
            },{  
                text : '姓名' ,  
                dataIndex : 'psnname'  
            },{  
                text : '身份证号' ,  
                dataIndex : 'id'  
            }],  
            selModel: {  
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'  
            },  
            floating: true,  
            hidden: true,  
            width : 300,  
            columnLines : true,  
            focusOnToFront: false  
        });  
        me.mon(picker, {  
            itemclick: me.onItemClick,  
            refresh: me.onListRefresh,  
            scope: me  
        });  
  
        me.mon(picker.getSelectionModel(), {  
            beforeselect: me.onBeforeSelect,  
            beforedeselect: me.onBeforeDeselect,  
            selectionchange: me.onListSelectionChange,  
            scope: me  
        });  
        this.picker = picker;  
        return picker;  
    },  
      
    onItemClick: function(picker, record){  
        /* 
         * If we're doing single selection, the selection change events won't fire when 
         * clicking on the selected element. Detect it here. 
         */  
        var me = this,  
            selection = me.picker.getSelectionModel().getSelection(),  
            valueField = me.valueField;  
  
        if (!me.multiSelect && selection.length) {  
            if (record.get(valueField) === selection[0].get(valueField)) {  
                // Make sure we also update the display value if it's only partial  
                me.displayTplData = [record.data];  
                me.setRawValue(me.getDisplayValue());  
                me.collapse();  
            }  
        }  
    },  
      
    matchFieldWidth : false,  
      
    onListSelectionChange: function(list, selectedRecords) {  
        var me = this,  
            isMulti = me.multiSelect,  
            hasRecords = selectedRecords.length > 0;  
        // Only react to selection if it is not called from setValue, and if our list is  
        // expanded (ignores changes to the selection model triggered elsewhere)  
        if (!me.ignoreSelection && me.isExpanded) {  
            if (!isMulti) {  
                Ext.defer(me.collapse, 1, me);  
            }  
            /* 
             * Only set the value here if we're in multi selection mode or we have 
             * a selection. Otherwise setValue will be called with an empty value 
             * which will cause the change event to fire twice. 
             */  
            if (isMulti || hasRecords) {  
                me.setValue(selectedRecords, false);  
            }  
            if (hasRecords) {  
                me.fireEvent('select', me, selectedRecords);  
            }  
            me.inputEl.focus();  
        }  
        console.log(me.getValue());  
    },  
      
    doAutoSelect: function() {  
        var me = this,  
            picker = me.picker,  
            lastSelected, itemNode;  
        if (picker && me.autoSelect && me.store.getCount() > 0) {  
            // Highlight the last selected item and scroll it into view  
            lastSelected = picker.getSelectionModel().lastSelected;  
            itemNode = picker.view.getNode(lastSelected || 0);  
            if (itemNode) {  
                picker.view.highlightItem(itemNode);  
                picker.view.el.scrollChildIntoView(itemNode, false);  
            }  
        }  
    }  
      
      
});  