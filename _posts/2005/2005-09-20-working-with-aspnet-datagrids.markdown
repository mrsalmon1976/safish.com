---
layout: post
title: Working with ASP.NET DataGrids
date: 2005-09-20 00:00:00
tags: [csharp, asp.net]
published: true
---

**Adding images to DataGrid Headers**

It is often useful to add "sorting images" to datagrid columns that can be sorted on a web page. However, there isn't an obvious way of adding these images if the HeaderText property is set for each column.

One way of doing it, is to add an image control to the appropriate header during the binding of the data.

In the following example, I have a Sort property on my Page object that returns the current sort field; a SortDirection property that returns "ASC" or "DESC" from ViewState; and my data grid is called dgRequests:

```csharp
private void dgRequests_ItemDataBound(object sender, 
 System.Web.UI.WebControls.DataGridItemEventArgs e) {
  if (e.Item.DataItem == null) {
    DataGrid dg = (DataGrid)sender;
    DataGridColumn col;
    for (int i=0; i<dg.Columns.Count; i++) {
      col = dg.Columns[i];
      if (col.SortExpression == this.Sort) {
        System.Web.UI.WebControls.Image img = new System.Web.UI.WebControls.Image();
        img.ImageUrl = ((SortDirection == "ASC") ? 
          "images/arrow_up.gif" : "images/arrow_down.gif");
        e.Item.Cells[i].Controls.Add(img);        
      }
    }
  }
}
```

**Changing default behaviour of paging buttons**

Sometimes you need to get at paging buttons - for example I was working on a project where ViewState was banned due to the page bloat it created and a maximum allowable page size of 40k.

Turning off view state does NOT mean you have to abandon the paging that comes with the grid - all you have to do is edit the attributes of the links at run time with the ItemCreated event.

```csharp
  this.gridComms.ItemCreated += new 
    System.Web.UI.WebControls.DataGridItemEventHandler(this.gridComms_ItemCreated);

......

private void gridComms_ItemCreated(object sender, 
  System.Web.UI.WebControls.DataGridItemEventArgs e)
{
  if (e.Item.ItemType == ListItemType.Pager) 
  {
    TableCell pager = (TableCell) e.Item.Controls[0];
      foreach (Control c in pager.Controls) 
      {
        if (c is LinkButton) 
        {
          LinkButton btn = (LinkButton)c;
          btn.Attributes.Add("onclick", "changePage('" + btn.Text + 
            "');return false;");
        }
      }
  }
}
```