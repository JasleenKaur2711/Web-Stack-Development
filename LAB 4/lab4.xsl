<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
    <h1>About</h1>
    <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Address</th>
      <th style="text-align:left">Telephone</th>
      <th style="text-align:left">Email</th>
     </tr>
      <xsl:for-each select="hotel/about">
        <tr>
        <td><xsl:value-of select="description"/></td>
         <td><xsl:value-of select="address"/></td>
         <td><xsl:value-of select="telephone"/></td>
         <td><xsl:value-of select="email"/></td>
        </tr>
      </xsl:for-each>
    </table>

    <h1>Contact</h1>
    <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Email</th>
      <th style="text-align:left">Telephone</th>
     </tr>
      <xsl:for-each select="hotel/contact">
        <tr>
        <td><xsl:value-of select="name"/></td>
         <td><xsl:value-of select="email"/></td>
         <td><xsl:value-of select="telephone"/></td>
        </tr>
      </xsl:for-each>
    </table>

    <h1>Customer Details</h1>
    <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">First name</th>
      <th style="text-align:left">Last name</th>
      <th style="text-align:left">Email</th>
      <th style="text-align:left">Number</th>
      <th style="text-align:left">Address</th>
      <th style="text-align:left">Room Type</th>
     </tr>
      <xsl:for-each select="hotel/customer">
      <xsl:sort select="fname"/>
      <xsl:if test="roomtype != 'Triple Sharing'">
        <tr>
        <td><xsl:value-of select="fname"/></td>
         <td><xsl:value-of select="lname"/></td>
         <td><xsl:value-of select="email"/></td>
         <td><xsl:value-of select="number"/></td>
         <td><xsl:value-of select="address"/></td>
         <td><xsl:value-of select="roomtype"/></td>
        </tr>
      </xsl:if>
      </xsl:for-each>
    </table>
    
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>